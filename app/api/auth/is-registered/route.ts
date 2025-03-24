import { onlyAuthorized } from "@/lib/backend/middleware";
import { prisma } from "@/lib/backend/prisma";
import { StatusCodes } from "http-status-codes";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export type IsRegistered = {
  isRegistered: boolean;
};

export async function GET(_: Request): Promise<NextResponse<IsRegistered>> {
  const cookieStore = await cookies();

  const middlewareRes = await onlyAuthorized(cookieStore);
  if (!middlewareRes.pass) {
    return NextResponse.json(
      { isRegistered: false },
      { status: StatusCodes.OK },
    );
  }

  const { payload } = middlewareRes.data!;

  const result = await prisma.user.findFirst({
    where: { email: payload.email },
    select: { sixDigitCode: true },
  });
  return NextResponse.json(
    { isRegistered: result != null && result.sixDigitCode != null },
    { status: StatusCodes.OK },
  );
}
