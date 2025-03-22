import { generateToken, parseToken } from "@/lib/backend/jwt";
import { prisma } from "@/lib/backend/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json(
      { error: "invalid request body" },
      { status: 400 },
    );
  }
  const refreshToken = body.refreshToken || "";
  const tokenId = body.tokenId || "";

  const payload = parseToken(refreshToken);
  if (!payload) {
    return NextResponse.json(
      { error: "invalid refresh token" },
      { status: 400 },
    );
  }

  const result = await prisma.token.findFirst({
    where: { id: tokenId },
    select: { refreshToken: true },
  });
  if (!result) {
    return NextResponse.json({ error: "token not found" }, { status: 404 });
  }
  if (result?.refreshToken != refreshToken) {
    return NextResponse.json(
      { error: "invalid refresh token" },
      { status: 400 },
    );
  }

  const newToken = generateToken({ email: payload.email, role: payload.role });
  await prisma.token.update({
    where: { id: tokenId },
    data: {
      accessToken: newToken.accessToken,
      refreshToken: newToken.refreshToken,
    },
  });

  return NextResponse.json(
    {
      tokenId: tokenId,
      accessToken: newToken.accessToken,
      refreshToken: newToken.refreshToken,
    },
    { status: 200 },
  );
}
