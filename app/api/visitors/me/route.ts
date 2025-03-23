import { isOneOfRole, onlyAuthorized } from "@/lib/backend/middleware";
import { prisma } from "@/lib/backend/prisma";
import { HTTPError } from "@/lib/backend/types/httpError";
import { Visitor } from "@/lib/backend/types/user";
import { UUID } from "crypto";
import { StatusCodes } from "http-status-codes";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<Visitor | HTTPError>> {
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

  const user = await prisma.user.findFirst({ where: { email: payload.email } });
  if (!user) {
    return NextResponse.json(
      { error: "visitor not found" },
      { status: StatusCodes.NOT_FOUND },
    );
  }
  if (user.role != "VISITOR") {
    return NextResponse.json(
      { error: "invalid role" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }

  // TODO: not like this
  const visitor: Visitor = {
    id: user.id as UUID,
    email: user.email,
    sixDigitCode: user.sixDigitCode!,
    name: user.name!,
    surname: user.surname!,
    gender: user.gender!,
    phone: user.phone!,
    category: user.category!,
    visitDate: user.visitDate!,
    interestedActivities: user.interestedActivities || undefined,
    referralSource: user.referralSource || undefined,
    studentLevel: user.studentLevel || undefined,
    studyStream: user.studyStream || undefined,
    school: user.school || undefined,
    province: user.province || undefined,
    interestLevel: user.interestLevel || undefined,
    interestedField: user.interestedField || undefined,
    emergencyContact: user.emergencyContact || undefined,
    universityYear: user.universityYear || undefined,
    faculty: user.faculty || undefined,
    university: user.university || undefined,
    alumniBatch: user.alumniBatch || undefined,
    teacherSchool: user.teacherSchool || undefined,
    teacherProvince: user.teacherProvince || undefined,
    subjectTaught: user.subjectTaught || undefined,
    role: "VISITOR",
  };

  return NextResponse.json(visitor, { status: StatusCodes.OK });
}
