import { NextResponse } from "next/server";
import { prisma } from "@/lib/backend/prisma";
import { fromZodError } from "zod-validation-error";
import { WorkshopQuerySchema } from "@/lib/backend/schemas/query";
import { StatusCodes } from "http-status-codes";

//Get All Events
export async function GET(request: Request) : Promise<Response> {
  const { searchParams } = new URL(request.url);

  // Extract query parameters
  const data = JSON.parse(searchParams.get("data")!);

  // Validate query parameters
  const queryParams = { data };
  const validation = WorkshopQuerySchema.safeParse(queryParams);
  
  if (!validation.success) {
    return NextResponse.json(
      { message: "Invalid query parameters", errors: fromZodError(validation.error) },
      { status: StatusCodes.BAD_REQUEST }
    );
  }
  
  const {search} = validation.data.data || {};

  try {
    // Fetch events with necessary fields
    const events = await prisma.workshop.findMany({
      include: {intaniaLocation: true, workshopSlots: true},
      where: {
        ...(search
          ? {
              OR: [
                { name: { contains: search?.trim(), mode: "insensitive" } },
              ],
            }
          : {}),
      },
    });
  
    return NextResponse.json(events, { status: StatusCodes.OK });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error", error }, { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
}


