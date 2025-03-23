import { isOneOfRole, onlyAuthorized } from "@/lib/backend/middleware";
import { prisma } from "@/lib/backend/prisma";
import { HTTPError } from "@/lib/backend/types/httpError";
import { Prisma } from "@prisma/client";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<object | HTTPError>> {
  const cookieStore = await cookies();

  const middlewareResponse = await onlyAuthorized(cookieStore);
  if (!middlewareResponse.pass) {
    return middlewareResponse.response!;
  }
  const { payload } = middlewareResponse.data!;

  const middlewareResponse2 = isOneOfRole(["VISITOR"], payload);
  if (!middlewareResponse2.pass) {
    return middlewareResponse2.response!;
  }

  const { id: workshopSlotId } = await params;

  const result = await prisma.user.findFirst({
    where: { email: payload.email },
    select: { id: true },
  });
  if (!result) {
    // payload email should be valid
    return NextResponse.json(
      { error: ReasonPhrases.INTERNAL_SERVER_ERROR },
      { status: StatusCodes.INTERNAL_SERVER_ERROR },
    );
  }
  const visitorId = result.id;

  try {
    await prisma.$transaction(async (tx) => {
      // decrement currentRegistrantCount
      await tx.workshopSlot.update({
        where: { id: workshopSlotId },
        data: { currentRegistrantCount: { decrement: 1 } },
      });

      // delete the registration
      await tx.registeredWorkshopSlotOnVisitor.delete({
        where: {
          visitorId_registeredWorkshopSlotId: {
            visitorId: visitorId,
            registeredWorkshopSlotId: workshopSlotId,
          },
        },
      });
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code == "P2023") {
        return NextResponse.json(
          { error: "invalid workshop slot id" },
          { status: StatusCodes.BAD_REQUEST },
        );
      }
      if (error.code == "P2025") {
        const message = getPrismaErrorMessage(error.message);
        if (
          message ===
          "An operation failed because it depends on one or more records that were required but not found. Record to update not found."
        ) {
          return NextResponse.json(
            { error: "invalid workshop slot id" },
            { status: StatusCodes.BAD_REQUEST },
          );
        } else if (
          message ===
          "An operation failed because it depends on one or more records that were required but not found. Record to delete does not exist."
        ) {
          return NextResponse.json(
            { error: "not registered yet" },
            { status: StatusCodes.BAD_REQUEST },
          );
        }
      }
    }
    return NextResponse.json(
      { error: ReasonPhrases.INTERNAL_SERVER_ERROR },
      { status: StatusCodes.INTERNAL_SERVER_ERROR },
    );
  }

  return NextResponse.json({}, { status: StatusCodes.OK });
}

function getPrismaErrorMessage(originalMessage: string) {
  const tmp = originalMessage.split("\n");
  return tmp[tmp.length - 1];
}
