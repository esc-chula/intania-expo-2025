import { NextResponse } from "next/server";
import { prisma, returnPrismaError } from "@/lib/backend/prisma";
import { StatusCodes } from "http-status-codes";
import { EventDetail } from "@/lib/backend/types/event";
import { HTTPError } from "@/lib/backend/types/httpError";

//Get an Event by ID
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse<EventDetail | Record<string, EventDetail> | HTTPError>> {
    const {id} = await params;

    try {
        const event = await prisma.event.findFirstOrThrow({
        include: {tags: true, intaniaLocation: true},
        where: {id: id},
        });
        return NextResponse.json(event, { status: StatusCodes.OK });
    } catch (error) {
        return returnPrismaError(error, [
            { code: 'P2025', msg: 'Event not found', status: StatusCodes.NOT_FOUND },
            { code: 'P2023', msg: 'Event not found', status: StatusCodes.NOT_FOUND },
        ]);
    }
}
