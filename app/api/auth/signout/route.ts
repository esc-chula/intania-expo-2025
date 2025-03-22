import { onlyAuthorized } from "@/lib/backend/middleware";
import { prisma, returnPrismaError } from "@/lib/backend/prisma";
import { HTTPError } from "@/lib/backend/types/httpError";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
): Promise<NextResponse<object | HTTPError>> {
  const middlewareRes = onlyAuthorized(request);
  if (!onlyAuthorized(request).pass) {
    return middlewareRes.response!;
  }

  const accessToken = middlewareRes.data!.accessToken!;

  let body;
  try {
    body = await request.json();
  } catch (_) {
    return NextResponse.json(
      { error: "invalid request body. expect tokenId" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }

  const tokenId = body.tokenId || "";

  try {
    await prisma.token.delete({
      where: { id: tokenId, accessToken: accessToken },
    });
  } catch (error) {
    return returnPrismaError(error, [
      {
        code: "P2025",
        msg: "token not found",
        status: StatusCodes.NOT_FOUND,
      },
    ]);
  }

  return NextResponse.json({}, { status: StatusCodes.OK });
}
