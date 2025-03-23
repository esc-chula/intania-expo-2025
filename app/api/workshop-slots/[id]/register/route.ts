import { isOneOfRole, onlyAuthorized } from "@/lib/backend/middleware";
import { prisma, returnPrismaError } from "@/lib/backend/prisma";
import { HTTPError } from "@/lib/backend/types/httpError";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<object | HTTPError>> {
  const cookieStore = await cookies();

  const middlewareResponse = onlyAuthorized(cookieStore);
  if (!middlewareResponse.pass) {
    return middlewareResponse.response!;
  }
  const { payload } = middlewareResponse.data!;

  const middlewareResponse2 = isOneOfRole(["VISITOR"], payload);
  if (!middlewareResponse2.pass) {
    return middlewareResponse2.response!;
  }

  const { id: workshopSlotId } = await params;

  // get visitor id
  const userResult = await prisma.user.findFirst({
    where: { email: payload.email },
    select: { id: true },
  });
  if (!userResult) {
    // payload email should be valid
    return NextResponse.json(
      { error: ReasonPhrases.INTERNAL_SERVER_ERROR },
      { status: StatusCodes.INTERNAL_SERVER_ERROR },
    );
  }
  const visitorId = userResult.id;

  try {
    await prisma.$transaction(async (tx) => {
      // get workshop id
      const workshopSlotResult = await tx.workshopSlot.findFirstOrThrow({
        where: { id: workshopSlotId },
        select: { workshopId: true, currentRegistrantCount: true, maxRegistrantCount: true },
      });

      if (workshopSlotResult.currentRegistrantCount >= workshopSlotResult.maxRegistrantCount!) {
        throw new Error("Workshop slot is full");
      }

      await tx.workshopSlot.update({
        where: { id: workshopSlotId },
        data: { currentRegistrantCount: { increment: 1 } },
      });

      const workshopId = workshopSlotResult.workshopId;

      await tx.registeredWorkshopSlotOnVisitor.create({
        data: {
          visitorId: visitorId,
          registeredWorkshopSlotId: workshopSlotId,
          workshopId: workshopId,
          checkIn: false,
        },
      });

    });
  } catch (error) {
    if (error instanceof Error && error.message === "Workshop slot is full") {
      return NextResponse.json(
        { error: "Workshop slot is full" },
        { status: StatusCodes.BAD_REQUEST },
      );
    }

    return returnPrismaError(error, [
      {
        code: "P2023",
        msg: "invalid workshop slot id",
        status: StatusCodes.BAD_REQUEST,
      },
      {
        code: "P2025",
        msg: "invalid workshop slot id",
        status: StatusCodes.BAD_REQUEST,
      },
      {
        code: "P2002",
        msg: "already registered this workshop",
        status: StatusCodes.BAD_REQUEST,
      },
      {
        code: "P2003",
        msg: "invalid workshop slot id",
        status: StatusCodes.BAD_REQUEST,
      },
    ]);
  }

  return NextResponse.json({}, { status: StatusCodes.OK });
}
