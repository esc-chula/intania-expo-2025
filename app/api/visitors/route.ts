import { isOneOfRole, onlyAuthorized } from "@/lib/backend/middleware";
import { prisma, returnPrismaError } from "@/lib/backend/prisma";
import { CreateVisitorSchema } from "@/lib/backend/schemas/visitor";
import { HTTPError } from "@/lib/backend/types/httpError";
import { Visitor } from "@/lib/backend/types/user";
import { StatusCodes } from "http-status-codes";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { fromZodError } from "zod-validation-error";

export async function POST(
  request: Request,
): Promise<NextResponse<Visitor | HTTPError>> {
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

  let body;
  try {
    body = await request.json();
  } catch (_) {
    return NextResponse.json(
      { error: "invalid request body" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }
  const parseResponse = CreateVisitorSchema.safeParse(body);
  if (!parseResponse.success) {
    return NextResponse.json(
      { error: fromZodError(parseResponse.error).toString() },
      { status: StatusCodes.BAD_REQUEST },
    );
  }

  const dto = parseResponse.data;
  if (dto.email != payload.email) {
    return NextResponse.json(
      { error: "invalid email for this token" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }

  let visitor;
  try {
    visitor = await prisma.user.findFirstOrThrow({
      where: { email: payload.email },
      select: { id: true, incrementCode: true, sixDigitCode: true },
    });
    if (visitor.sixDigitCode) {
      return NextResponse.json(
        { error: "already registered" },
        { status: StatusCodes.CONFLICT },
      );
    }

    const formatNumber = ("000000" + visitor.incrementCode).slice(-6);
    const sixDigitCode = "S-" + formatNumber;

    visitor = await prisma.user.update({
      where: { id: visitor.id },
      data: { ...dto, sixDigitCode },
    });
  } catch (error) {
    return returnPrismaError(error, [
      {
        code: "P2025",
        msg: "user not found",
        status: StatusCodes.CONFLICT,
      },
    ]);
  }

  return NextResponse.json(visitor as Visitor, { status: StatusCodes.CREATED });
}
