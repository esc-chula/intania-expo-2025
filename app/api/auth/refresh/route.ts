import { setJwtToken } from "@/lib/backend/cookie";
import { generateToken, parseToken } from "@/lib/backend/jwt";
import { onlyAuthorized } from "@/lib/backend/middleware";
import { prisma, returnPrismaError } from "@/lib/backend/prisma";
import { HTTPError } from "@/lib/backend/types/httpError";
import { StatusCodes } from "http-status-codes";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(): Promise<NextResponse<object | HTTPError>> {
  const cookieStore = await cookies();

  const middlewareRes = onlyAuthorized(cookieStore);
  if (!middlewareRes.pass) {
    return middlewareRes.response!;
  }

  const { refreshToken, tokenId } = middlewareRes.data!;

  const payload = parseToken(refreshToken);
  if (!payload) {
    return NextResponse.json(
      { error: "invalid refresh token" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }

  const result = await prisma.token.findFirst({
    where: { id: tokenId },
    select: { refreshToken: true },
  });
  if (!result) {
    return NextResponse.json(
      { error: "token not found" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }
  if (result?.refreshToken != refreshToken) {
    return NextResponse.json(
      { error: "invalid refresh token" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }

  const newToken = generateToken({ email: payload.email, role: payload.role });
  try {
    await prisma.token.update({
      where: { id: tokenId },
      data: {
        accessToken: newToken.accessToken,
        refreshToken: newToken.refreshToken,
      },
    });
  } catch (error) {
    return returnPrismaError(error, [
      {
        code: "P2025",
        msg: "invalid token id",
        status: StatusCodes.BAD_REQUEST,
      },
    ]);
  }

  setJwtToken(
    cookieStore,
    newToken.accessToken,
    newToken.refreshToken,
    tokenId,
  );

  return NextResponse.json({}, { status: StatusCodes.OK });
}
