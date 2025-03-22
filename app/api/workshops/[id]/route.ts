import { prisma } from "@/lib/backend/prisma";
import { HTTPError } from "@/lib/backend/types/httpError";
import { Workshop } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<Workshop | HTTPError>> {
  const { id } = await params;

  const workshop = await prisma.workshop.findFirst({
    where: { id: id },
    include: { intaniaLocation: true, workshopSlots: true },
  });
  if (!workshop) {
    return NextResponse.json(
      { error: "workshop not found" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }

  return NextResponse.json(workshop, { status: StatusCodes.OK });
}
