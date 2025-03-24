import { prisma } from "@/lib/backend/prisma";
import { SortingSchema } from "@/lib/backend/schemas/query";
import { HTTPError } from "@/lib/backend/types/httpError";
import { BuildingDetail } from "@/lib/backend/types/map";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";
import { fromZodError } from "zod-validation-error";

export async function GET(
  request: Request,
): Promise<NextResponse<BuildingDetail[] | HTTPError>> {
  const { searchParams } = new URL(request.url);

  let sorting;
  try {
    sorting = JSON.parse(searchParams.get("sorting")!);
  } catch (_) {
    return NextResponse.json(
      { error: "invalid request body" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }

  const validation = SortingSchema.safeParse(sorting);
  if (!validation.success) {
    return NextResponse.json(
      { error: fromZodError(validation.error).toString() },
      { status: StatusCodes.BAD_REQUEST },
    );
  }

  try {
    const buildings = await prisma.building.findMany({
      include: { floors: { include: { rooms: true } } },
      orderBy: validation.data
        ? validation.data.columns.map((column) => {
            return {
              [column]: validation.data!.ascending ? "asc" : "desc",
            };
          })
        : {},
    });
    return NextResponse.json(buildings, { status: StatusCodes.OK });
  } catch (_) {
    return NextResponse.json(
      { error: ReasonPhrases.INTERNAL_SERVER_ERROR },
      { status: StatusCodes.INTERNAL_SERVER_ERROR },
    );
  }
}
