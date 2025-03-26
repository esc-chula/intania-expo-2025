import { onlyAuthorized } from "@/lib/backend/middleware";
import { prisma } from "@/lib/backend/prisma";
import { WorkshopQuerySchema } from "@/lib/backend/schemas/query";
import { HTTPError } from "@/lib/backend/types/httpError";
import { WorkshopDetail } from "@/lib/backend/types/workshop";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { fromZodError } from "zod-validation-error";

// Get All Registered Workshops for each client
export async function GET(
  request: Request,
): Promise<NextResponse<WorkshopDetail[] | HTTPError>> {
  const { searchParams } = new URL(request.url);
  const cookieStore = await cookies();

  const middlewareResponse = await onlyAuthorized(cookieStore);
  if (!middlewareResponse.pass) {
    return middlewareResponse.response!;
  }
  const { payload } = middlewareResponse.data!;

  const userResult = await prisma.user.findFirst({
    where: { email: payload.email },
    select: { id: true },
  });
  if (!userResult) {
    // payload email should be valid
    return NextResponse.json(
      { error: ReasonPhrases.INTERNAL_SERVER_ERROR },
      { status: StatusCodes.INTERNAL_SERVER_ERROR },
    );
  }
  const visitorId = userResult.id;

  const data = JSON.parse(searchParams.get("data")!);
  const validation = WorkshopQuerySchema.safeParse({ data: data });

  if (!validation.success) {
    return NextResponse.json(
      { error: fromZodError(validation.error).toString() },
      { status: StatusCodes.BAD_REQUEST },
    );
  }

  const { search } = validation.data.data || {};

  try {
    const registeredWorkshops =
      await prisma.registeredWorkshopSlotOnVisitor.findMany({
        select: {
          workshop: {
            include: {
              intaniaLocation: true,
              workshopSlots: true,
            },
          },
          registeredWorkshopSlotId: true,
        },
        where: {
          ...(search
            ? {
                workshop: {
                  name: { contains: search?.trim(), mode: "insensitive" },
                },
              }
            : {}),
          visitorId: visitorId,
        },
      });
    const currentTime = new Date();
    const processedRegisteredWorkshops = registeredWorkshops.map(
      ({ workshop, registeredWorkshopSlotId }) => ({
        ...workshop,
        workshopSlots: workshop.workshopSlots.map((slot) => ({
          ...slot,
          status:
            slot.endTime < currentTime
              ? "ผ่านไปแล้ว"
              : slot.id === registeredWorkshopSlotId
                ? "ลงทะเบียนแล้ว"
                : "ว่าง",
        })),
      }),
    );
    return NextResponse.json(processedRegisteredWorkshops, {
      status: StatusCodes.OK,
    });
  } catch (_) {
    return NextResponse.json(
      { error: ReasonPhrases.INTERNAL_SERVER_ERROR },
      { status: StatusCodes.INTERNAL_SERVER_ERROR },
    );
  }
}
