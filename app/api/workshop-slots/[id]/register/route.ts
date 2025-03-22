import { isOneOfRole, onlyAuthorized } from "@/lib/backend/middleware";
import { prisma, returnPrismaError } from "@/lib/backend/prisma";
import { HTTPError } from "@/lib/backend/types/httpError";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<object | HTTPError>> {
  const middlewareResponse = onlyAuthorized(request);
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

  // get workshop id
  let workshopSlotResult;
  try {
    workshopSlotResult = await prisma.workshopSlot.findFirstOrThrow({
      where: { id: workshopSlotId },
      select: { workshopId: true },
    });
  } catch (error) {
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
    ]);
  }
  const workshopId = workshopSlotResult.workshopId;

  try {
    await prisma.registeredWorkshopSlotOnVisitor.create({
      data: {
        visitorId: visitorId,
        registeredWorkshopSlotId: workshopSlotId,
        workshopId: workshopId,
        checkIn: false,
      },
    });
  } catch (error) {
    return returnPrismaError(error, [
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
      {
        code: "P2023",
        msg: "invalid workshop slot id",
        status: StatusCodes.BAD_REQUEST,
      },
    ]);
  }

  return NextResponse.json({}, { status: StatusCodes.OK });
}
