import { NextResponse } from "next/server";
import { prisma, returnPrismaError } from "@/lib/backend/prisma";
import { StatusCodes } from "http-status-codes";

//Get an Event by ID
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const {id} = await params;

    try{
        try {
            const event = await prisma.event.findFirstOrThrow({
            include: {
                tags: true
            },
            where: {
                id: id
            },
            });
            return NextResponse.json(event, { status: StatusCodes.OK });
        } catch (error) {
            return returnPrismaError(error, [
                { code: 'P2025', msg: 'Event not found', status: StatusCodes.NOT_FOUND },
            ]);
        }
    } catch (error) {
        return NextResponse.json(error, {status: StatusCodes.INTERNAL_SERVER_ERROR});
    }
}
