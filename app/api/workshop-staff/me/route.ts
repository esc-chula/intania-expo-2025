import { isOneOfRole, onlyAuthorized } from "@/lib/backend/middleware";
import { prisma } from "@/lib/backend/prisma";
import { HTTPError } from "@/lib/backend/types/httpError";
import { WorkshopStaff } from "@/lib/backend/types/user";
import { UUID } from "crypto";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
): Promise<NextResponse<WorkshopStaff | HTTPError>> {
  const middlewareResponse = onlyAuthorized(request);
  if (!middlewareResponse.pass) {
    return middlewareResponse.response!;
  }
  const { payload } = middlewareResponse.data!;

  const middlewareResponse2 = isOneOfRole(["WORKSHOP_STAFF"], payload);
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
  if (user.role != "WORKSHOP_STAFF") {
    return NextResponse.json(
      { error: "invalid role" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }
  const workshopStaff: WorkshopStaff = {
    id: user.id as UUID,
    email: user.email,
    workshopId: user.workshopId! as UUID,
    role: "WORKSHOP_STAFF",
  };

  return NextResponse.json(workshopStaff, { status: StatusCodes.OK });
}
