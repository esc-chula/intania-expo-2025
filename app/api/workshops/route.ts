import { prisma } from "@/lib/backend/prisma";
import { WorkshopQuerySchema } from "@/lib/backend/schemas/query";
import { HTTPError } from "@/lib/backend/types/httpError";
import { WorkshopDetail } from "@/lib/backend/types/workshop";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";
import { fromZodError } from "zod-validation-error";

// Get All Workshops
export async function GET(
  request: Request,
): Promise<NextResponse<WorkshopDetail[] | HTTPError>> {
  const { searchParams } = new URL(request.url);

  // Extract query parameters
  let data;
  try {
    data = JSON.parse(searchParams.get("data")!);
  } catch (_) {
    return NextResponse.json(
      { error: "invalid request body" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }

  // Validate query parameters
  const validation = WorkshopQuerySchema.safeParse({ data: data });

  if (!validation.success) {
    return NextResponse.json(
      { error: fromZodError(validation.error).toString() },
      { status: StatusCodes.BAD_REQUEST },
    );
  }

  const { search } = validation.data.data || {};

  try {
    // Fetch events with necessary fields
    const workshops = await prisma.workshop.findMany({
      include: { intaniaLocation: true, workshopSlots: true },
      where: {
        ...(search
          ? {
              OR: [{ name: { contains: search?.trim(), mode: "insensitive" } }],
            }
          : {}),
      },
    });

    return NextResponse.json(workshops, { status: StatusCodes.OK });
  } catch (_) {
    return NextResponse.json(
      { error: ReasonPhrases.INTERNAL_SERVER_ERROR },
      { status: StatusCodes.INTERNAL_SERVER_ERROR },
    );
  }
}
