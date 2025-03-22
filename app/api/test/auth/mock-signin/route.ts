import { setJwtToken } from "@/lib/backend/cookie";
import { generateToken } from "@/lib/backend/jwt";
import { prisma } from "@/lib/backend/prisma";
import { HTTPError } from "@/lib/backend/types/httpError";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(
  request: Request,
): Promise<NextResponse<object | HTTPError>> {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: ReasonPhrases.NOT_FOUND },
      { status: StatusCodes.NOT_FOUND },
    );
  }

  const cookieStore = await cookies();

  let email;
  try {
    const body = await request.json();
    email = z.string().parse(body.email);
  } catch (_) {
    return NextResponse.json(
      { error: "invalid request body" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }

  let result = await prisma.user.findFirst({
    where: { email: email },
    select: { id: true, role: true },
  });
  if (!result) {
    // create user. default to visitor
    try {
      result = await prisma.user.create({
        data: {
          email: email,
          role: "VISITOR",
        },
        select: { id: true, role: true },
      });
    } catch (_) {
      return NextResponse.json(
        { error: ReasonPhrases.INTERNAL_SERVER_ERROR },
        { status: StatusCodes.INTERNAL_SERVER_ERROR },
      );
    }
  }

  const { accessToken, refreshToken } = generateToken({
    email,
    role: result.role,
  });

  let tokenId;
  try {
    const { id } = await prisma.token.create({
      data: {
        userId: result.id,
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
      select: { id: true },
    });
    tokenId = id;
  } catch (_) {
    return NextResponse.json(
      { error: ReasonPhrases.INTERNAL_SERVER_ERROR },
      { status: StatusCodes.INTERNAL_SERVER_ERROR },
    );
  }

  setJwtToken(cookieStore, accessToken, refreshToken, tokenId);

  return NextResponse.json({}, { status: StatusCodes.OK });
}
