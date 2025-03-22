import { onlyAuthorized } from "@/lib/backend/middleware";
import { prisma } from "@/lib/backend/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const middlewareRes = onlyAuthorized(request);
  if (!onlyAuthorized(request).pass) {
    return middlewareRes.response;
  }

  const accessToken = middlewareRes.data!.accessToken!;

  let body;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json(
      { error: "invalid request body" },
      { status: 400 },
    );
  }
  const tokenId = body.tokenId || "";

  try {
    await prisma.token.delete({
      where: { id: tokenId, accessToken: accessToken },
    });
  } catch (error) {
    return NextResponse.json({ error: "token not found" }, { status: 404 });
  }

  return NextResponse.json({}, { status: 200 });
}
