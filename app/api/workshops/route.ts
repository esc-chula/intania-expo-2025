import { isOneOfRole, onlyAuthorized } from "@/lib/backend/middleware";
import { prisma } from "@/lib/backend/prisma";
import { WorkshopQuerySchema } from "@/lib/backend/schemas/query";
import { HTTPError } from "@/lib/backend/types/httpError";
import { WorkshopDetail } from "@/lib/backend/types/workshop";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { fromZodError } from "zod-validation-error";

// Get All Workshops
//! Authorization is required
export async function GET(
  request: Request,
): Promise<NextResponse<WorkshopDetail[] | HTTPError>> {
  const { searchParams } = new URL(request.url);


  const cookieStore = await cookies();

  const middlewareResponse = onlyAuthorized(cookieStore);
  if (!middlewareResponse.pass) {
    return middlewareResponse.response!;
  }
  const { payload } = middlewareResponse.data!;

  // const middlewareResponse2 = isOneOfRole(["VISITOR" ], payload);
  // if (!middlewareResponse2.pass) {
  //   return middlewareResponse2.response!;
  // } //no need

  // get visitor id
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
  const allRegisteredWorkshopSlotId = await prisma.registeredWorkshopSlotOnVisitor.findMany({
    where : {
      visitorId:visitorId
    },
    select : {
      registeredWorkshopSlotId:true
    }
  });
  const setRegisteredWorkshopSlotId = new Set(allRegisteredWorkshopSlotId.map((slot) => slot.registeredWorkshopSlotId));
  console.log(setRegisteredWorkshopSlotId);

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

    const currentTime = new Date();
    const processedWorkshops = workshops.map(workshop => ({
      ...workshop,
      workshopSlots: workshop.workshopSlots.map(slot => {
        let status = "ว่าง"; // Default to available
    
        if (setRegisteredWorkshopSlotId.has(slot.id)) {
          status = "ลงทะเบียนแล้ว";
        } else if (slot.currentRegistrantCount >= slot.maxRegistrantCount!) {
          status = "เต็มแล้ว";
        } else if (slot.endTime < currentTime) {
          status = "ผ่านไปแล้ว";
        }
    
        return { ...slot, status };
      })
    }));
    return NextResponse.json(processedWorkshops, { status: StatusCodes.OK });
  } catch (_) {
    return NextResponse.json(
      { error: ReasonPhrases.INTERNAL_SERVER_ERROR },
      { status: StatusCodes.INTERNAL_SERVER_ERROR },
    );
  }
}
