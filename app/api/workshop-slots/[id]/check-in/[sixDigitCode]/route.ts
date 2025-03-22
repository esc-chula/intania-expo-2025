import { isOneOfRole, onlyAuthorized } from "@/lib/backend/middleware";
import { prisma, returnPrismaError } from "@/lib/backend/prisma";
import { HTTPError } from "@/lib/backend/types/httpError";
import { StatusCodes } from "http-status-codes";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string; sixDigitCode: string }> },
): Promise<NextResponse<object | HTTPError>> {
  const cookieStore = await cookies();

  const middlewareResponse = onlyAuthorized(cookieStore);
  if (!middlewareResponse.pass) {
    return middlewareResponse.response!;
  }
  const { payload } = middlewareResponse.data!;

  const middlewareResponse2 = isOneOfRole(["WORKSHOP_STAFF"], payload);
  if (!middlewareResponse2.pass) {
    return middlewareResponse2.response!;
  }

  const { id: workshopSlotId, sixDigitCode } = await params;

  const result = await prisma.user.findFirst({
    where: { sixDigitCode: sixDigitCode },
    select: { id: true, role: true },
  });
  if (!result) {
    return NextResponse.json(
      { error: "six digit code not found" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }
  if (result.role != "VISITOR") {
    return NextResponse.json(
      { error: "invalid role of six digit code" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }
  const visitorId = result.id;

  try {
    await prisma.registeredWorkshopSlotOnVisitor.update({
      where: {
        visitorId_registeredWorkshopSlotId: {
          visitorId: visitorId,
          registeredWorkshopSlotId: workshopSlotId,
        },
      },
      data: {
        checkIn: true,
      },
    });
  } catch (error) {
    return returnPrismaError(error, [
      {
        code: "P2025",
        msg: "registration not found",
        status: StatusCodes.BAD_REQUEST,
      },
    ]);
  }

  return NextResponse.json({}, { status: StatusCodes.OK });
}
