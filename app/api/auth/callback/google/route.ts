import { generateToken } from "@/lib/backend/jwt";
import { handleCallback } from "@/lib/backend/oauth";
import { prisma } from "@/lib/backend/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  let email: string;
  try {
    email = await handleCallback(request.url);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 },
      );
    }
  }

  let result = await prisma.user.findFirst({
    where: { email: email },
    select: { id: true, role: true },
  });
  if (!result) {
    // create user. default to visitor
    result = await prisma.user.create({
      data: {
        email: email,
        role: "VISITOR",
      },
      select: { id: true, role: true },
    });
  }

  const { accessToken, refreshToken } = generateToken({
    email,
    role: result.role,
  });
  const { id: tokenId } = await prisma.token.create({
    data: {
      userId: result.id,
      accessToken: accessToken,
      refreshToken: refreshToken,
    },
    select: { id: true },
  });

  return NextResponse.json(
    { tokenId, accessToken, refreshToken },
    { status: 200 },
  );
}
