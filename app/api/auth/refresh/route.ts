import { generateToken, parseToken } from "@/lib/backend/jwt";
import { prisma, returnPrismaError } from "@/lib/backend/prisma";
import { HTTPError } from "@/lib/backend/types/httpError";
import { TokenInfo } from "@/lib/backend/types/token";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
): Promise<NextResponse<TokenInfo | HTTPError>> {
  let body;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json(
      { error: "invalid request body" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }
  const refreshToken = body.refreshToken || "";
  const tokenId: string = body.tokenId || "";

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
    return returnPrismaError(
      error,
      "P2025",
      "invalid token id",
      StatusCodes.BAD_REQUEST,
    );
  }

  return NextResponse.json(
    {
      tokenId: tokenId,
      accessToken: newToken.accessToken,
      refreshToken: newToken.refreshToken,
    },
    { status: StatusCodes.OK },
  );
}
