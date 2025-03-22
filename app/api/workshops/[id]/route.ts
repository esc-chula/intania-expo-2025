import { prisma, returnPrismaError } from "@/lib/backend/prisma";
import { HTTPError } from "@/lib/backend/types/httpError";
import { WorkshopDetail } from "@/lib/backend/types/workshop";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

//Get an Workshop by ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<WorkshopDetail | HTTPError>> {
  const { id } = await params;

  try {
    const workshop = await prisma.workshop.findFirstOrThrow({
      include: {
        workshopSlots: true,
        intaniaLocation: true,
      },
      where: {
        id: id,
      },
    });
    return NextResponse.json(workshop, { status: StatusCodes.OK });
  } catch (error) {
    return returnPrismaError(error, [
      {
        code: "P2025",
        msg: "Workshop not found",
        status: StatusCodes.NOT_FOUND,
      },
      {
        code: "P2023",
        msg: "Workshop not found",
        status: StatusCodes.NOT_FOUND,
      },
    ]);
  }
}
