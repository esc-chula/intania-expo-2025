import { prisma, returnPrismaError } from "@/lib/backend/prisma";
import { HTTPError } from "@/lib/backend/types/httpError";
import { RoomDetail } from "@/lib/backend/types/map";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<RoomDetail | HTTPError>> {
  const { id } = await params;

  let room;
  try {
    room = await prisma.room.findFirstOrThrow({
      where: { id: id },
    });
  } catch (error) {
    return returnPrismaError(error, [
      {
        code: "P2025",
        msg: "room not found",
        status: StatusCodes.NOT_FOUND,
      },
      {
        code: "P2023",
        msg: "room not found",
        status: StatusCodes.NOT_FOUND,
      },
    ]);
  }

  return NextResponse.json(room, { status: StatusCodes.OK });
}
