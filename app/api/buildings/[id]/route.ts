import { prisma, returnPrismaError } from "@/lib/backend/prisma";
import { HTTPError } from "@/lib/backend/types/httpError";
import { BuildingDetail } from "@/lib/backend/types/map";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<BuildingDetail | HTTPError>> {
  const { id } = await params;

  let building;
  try {
    building = await prisma.building.findFirstOrThrow({
      where: { id: id },
      include: { floors: { include: { rooms: true } } },
    });
  } catch (error) {
    return returnPrismaError(error, [
      {
        code: "P2025",
        msg: "building not found",
        status: StatusCodes.NOT_FOUND,
      },
      {
        code: "P2023",
        msg: "building not found",
        status: StatusCodes.NOT_FOUND,
      },
    ]);
  }

  return NextResponse.json(building, { status: StatusCodes.OK });
}
