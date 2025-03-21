import { isOneOfRole, onlyAuthorized } from "@/lib/backend/middleware";
import { prisma } from "@/lib/backend/prisma";
import { HTTPError } from "@/lib/backend/types/httpError";
import { ExpoStaff } from "@/lib/backend/types/user";
import { UUID } from "crypto";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
): Promise<NextResponse<ExpoStaff | HTTPError>> {
  const middlewareResponse = onlyAuthorized(request);
  if (!middlewareResponse.pass) {
    return middlewareResponse.response!;
  }
  const { payload } = middlewareResponse.data!;

  const middlewareResponse2 = isOneOfRole(["EXPO_STAFF"], payload);
  if (!middlewareResponse2.pass) {
    return middlewareResponse2.response!;
  }

  const user = await prisma.user.findFirst({ where: { email: payload.email } });
  if (!user) {
    return NextResponse.json(
      { error: "staff not found" },
      { status: StatusCodes.NOT_FOUND },
    );
  }
  if (user.role != "EXPO_STAFF") {
    return NextResponse.json(
      { error: "invalid role" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }
  const expoStaff: ExpoStaff = {
    id: user.id as UUID,
    email: user.email,
    role: "EXPO_STAFF",
  };

  return NextResponse.json(expoStaff, { status: StatusCodes.OK });
}
