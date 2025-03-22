import { prisma, returnPrismaError } from "@/lib/backend/prisma";
import { HTTPError } from "@/lib/backend/types/httpError";
import { FloorDetail } from "@/lib/backend/types/map";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<FloorDetail | HTTPError>> {
  const { id } = await params;

  let floor;
  try {
    floor = await prisma.floor.findFirstOrThrow({
      where: { id: id },
      include: { rooms: true },
    });
  } catch (error) {
    return returnPrismaError(error, [
      {
        code: "P2025",
        msg: "floor not found",
        status: StatusCodes.NOT_FOUND,
      },
      {
        code: "P2023",
        msg: "floor not found",
        status: StatusCodes.NOT_FOUND,
      },
    ]);
  }

  return NextResponse.json(floor, { status: StatusCodes.OK });
}
