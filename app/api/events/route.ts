import { NextResponse } from "next/server";
import { prisma } from "@/lib/backend/prisma";
import { fromZodError } from "zod-validation-error";
import { EventQuerySchema } from "@/lib/backend/schemas/query";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { EventDetail } from "@/lib/backend/types/event";
import { HTTPError } from "@/lib/backend/types/httpError";

//Get All Events
export async function GET(request: Request): Promise<NextResponse<EventDetail[] | Record<string, EventDetail[]> | HTTPError>> {
  const { searchParams } = new URL(request.url);

  // Extract query parameters
  let data;
  try {
    data = JSON.parse(searchParams.get("data")!);
  } catch (_) {
    return NextResponse.json(
      { error: "invalid query parameters" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }
  const grouping = searchParams.get("grouping")?.split(",") || [];

  // Validate query parameters
  const queryParams = { data: data, grouping: grouping };
  const validation = EventQuerySchema.safeParse(queryParams);

  if (!validation.success) {
    return NextResponse.json(
      { error: fromZodError(validation.error).toString() },
      { status: StatusCodes.BAD_REQUEST }
    );
  }

  const { search, tags } = validation.data.data || {};

  try {
    // Fetch events with necessary fields
    const events = await prisma.event.findMany({
      include: { tags: true, intaniaLocation: true },
      where: {
        ...(search
          ? {
            OR: [
              { name: { contains: search?.trim(), mode: "insensitive" } },
              { body: { contains: search?.trim(), mode: "insensitive" } },
            ],
          }
          : {}),
        ...(tags && tags.length > 0
          ? { tags: { some: { name: { in: tags } } } }
          : {}),
      },
    });

    // Group events by specified key
    if (grouping.includes("startTime")) {
      const groupedEvents = groupBystartTime(events);
      return NextResponse.json(groupedEvents, { status: StatusCodes.OK });
    }

    if (grouping.includes("tags")) {
      const groupedEvents = groupByTags(events, tags);
      return NextResponse.json(groupedEvents, { status: StatusCodes.OK });
    }

    return NextResponse.json(events, { status: StatusCodes.OK });
  } catch (_) {
    return NextResponse.json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR }, { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
}

// Utility function to group data
function groupBystartTime(events: EventDetail[], key: string = "startTime") {
  return events.reduce((result: Record<string, EventDetail[]>, event: EventDetail) => {
    const groupKey = event[key as keyof EventDetail] as string;
    if (!result[groupKey]) result[groupKey] = [];
    result[groupKey].push(event);
    return result;
  }, {});
}

function groupByTags(events: EventDetail[], tags: string[] = []): Record<string, EventDetail[]> {
  // Group events by their associated tags, filtering by the provided tags if any
  const groupedEvents: Record<string, EventDetail[]> = {};

  events.forEach((event) => {
    event.tags.forEach((tag: { name: string; id: string }) => {
      if (tags.length === 0 || tags.includes(tag.name)) {
        const groupKey = tag.name;
        if (!groupedEvents[groupKey]) groupedEvents[groupKey] = [];
        groupedEvents[groupKey].push(event);
      }
    });
  });

  return groupedEvents;
}


