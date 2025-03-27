import { isOneOfRole, onlyAuthorized } from "@/lib/backend/middleware";
import { prisma, returnPrismaError } from "@/lib/backend/prisma";
import { HTTPError } from "@/lib/backend/types/httpError";
import { VisitorDetails } from "@/lib/backend/types/user";
import { StatusCodes } from "http-status-codes";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ sixDigitCode: string }> },
): Promise<NextResponse<VisitorDetails | HTTPError>> {
  const cookieStore = await cookies();

  const middlewareResponse = await onlyAuthorized(cookieStore);
  if (!middlewareResponse.pass) {
    return middlewareResponse.response!;
  }
  const { payload } = middlewareResponse.data!;
  console.log(payload);

  const middlewareResponse2 = isOneOfRole(
    ["EXPO_STAFF", "WORKSHOP_STAFF"],
    payload,
  );
  if (!middlewareResponse2.pass) {
    return middlewareResponse2.response!;
  }

  const { sixDigitCode } = await params;

  try {
    const user = await prisma.user.findFirstOrThrow({
      where: { sixDigitCode: sixDigitCode },
      select: {
        id: true,
        email: true,
        role: true,
        sixDigitCode: true,
        incrementCode: true,
        name: true,
        surname: true,
        gender: true,
        phone: true,
        category: true,
        visitDates: true,
        interestedActivities: true,
        referralSources: true,
        studentLevel: true,
        studyStream: true,
        school: true,
        province: true,
        interestLevel: true,
        interestedFields: true,
        emergencyContact: true,
        universityYear: true,
        faculty: true,
        university: true,
        alumniBatch: true,
        teacherSchool: true,
        teacherProvince: true,
        subjectTaught: true,
        workshopId: false, // Exclude workshopId
      },
    });
    return NextResponse.json(user, { status: StatusCodes.OK });
  } catch (error) {
    return returnPrismaError(error, [
      {
        code: "P2025",
        msg: "visitor not found",
        status: StatusCodes.NOT_FOUND,
      },
      {
        code: "P2023",
        msg: "visitor not found",
        status: StatusCodes.NOT_FOUND,
      },
    ]);
  }
}
