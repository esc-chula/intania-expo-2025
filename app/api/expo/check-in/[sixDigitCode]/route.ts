import { isOneOfRole, onlyAuthorized } from "@/lib/backend/middleware";
import { prisma, returnPrismaError } from "@/lib/backend/prisma";
import { HTTPError } from "@/lib/backend/types/httpError";
import { StatusCodes } from "http-status-codes";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ sixDigitCode: string }> },
): Promise<NextResponse<object | HTTPError>> {
  const { sixDigitCode } = await params;
  const cookieStore = await cookies();

  const middlewareResponse = await onlyAuthorized(cookieStore);
  if (!middlewareResponse.pass) {
    return middlewareResponse.response!;
  }
  const { payload } = middlewareResponse.data!;
  const middlewareResponse2 = isOneOfRole(["EXPO_STAFF"], payload);
  if (!middlewareResponse2.pass) {
    return middlewareResponse2.response!;
  }
  const user = await prisma.user.findFirst({ where: { email: payload.email } });
  if (!user) {
    return NextResponse.json(
      { error: "staff not found" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }
  if (user.role != "EXPO_STAFF") {
    return NextResponse.json(
      { error: "invalid role (accept only Expo Staff)" },
      { status: StatusCodes.FORBIDDEN },
    );
  }

  try {
    const { id, role } = await prisma.user.findFirstOrThrow({
      // this will throw if can't found user
      where: { sixDigitCode: sixDigitCode },
      select: { id: true, role: true },
    });
    if (role != "VISITOR") {
      return NextResponse.json(
        { error: "invalid role of six digit code" },
        { status: StatusCodes.BAD_REQUEST },
      );
    }
    const checkInDate = await prisma.checkedInExpoOnVisitor.findFirst({
      where: { visitorId: id },
      orderBy: { checkIn: "desc" },
      select: { checkIn: true },
    });
    const nowDate = new Date();
    const toDay = nowDate.getUTCDay();

    if (checkInDate != null) {
      const checkInDay = checkInDate.checkIn.getUTCDay();
      if (checkInDay < toDay) {
        //TODO : not check in yet
        const _ = await prisma.checkedInExpoOnVisitor.create({
          data: { visitorId: id, checkIn: nowDate },
          select: { visitor: true, visitorId: true, checkIn: true },
        });
        return NextResponse.json({}, { status: StatusCodes.OK });
      } else {
        // already checked in //! checkInDay > toDay is not neccessary
        return NextResponse.json(
          { error: "already checked in" },
          { status: StatusCodes.CONFLICT },
        );
      }
    } else {
      //TODO : first time check in
      const _ = await prisma.checkedInExpoOnVisitor.create({
        data: {
          visitorId: id,
          checkIn: nowDate,
        },
        select: {
          visitor: true,
          visitorId: true,
          checkIn: true,
        },
      });
      return NextResponse.json({}, { status: StatusCodes.OK });
    }
  } catch (error) {
    // error
    return returnPrismaError(error, [
      {
        code: "P2025",
        msg: "six digit code not found",
        status: StatusCodes.NOT_FOUND,
      },
    ]);
  }
}
