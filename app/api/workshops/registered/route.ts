import { NextResponse } from 'next/server';
import { HTTPError } from '@/lib/backend/types/httpError';
import { RegisteredWorkshopDetail } from '@/lib/backend/types/workshop';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { WorkshopQuerySchema } from '@/lib/backend/schemas/query';
import { fromZodError } from 'zod-validation-error';
import { prisma } from '@/lib/backend/prisma';

export async function GET(request: Request): Promise<NextResponse<RegisteredWorkshopDetail[] | HTTPError>> {
    const { searchParams } = new URL(request.url);
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
        const registeredWorkshops = await prisma.registeredWorkshopSlotOnVisitor.findMany({
            include: { visitor: true, workshop: true, registeredWorkshopSlot: true },
            where: {
                ...(search
                    ? {
                        OR: [{ workshop: { name: { contains: search?.trim(), mode: "insensitive" } } }],
                    }
                    : {}),
            },
        });

        return NextResponse.json(registeredWorkshops, { status: StatusCodes.OK });
    } catch (_) {
        return NextResponse.json(
            { error: ReasonPhrases.INTERNAL_SERVER_ERROR },
            { status: StatusCodes.INTERNAL_SERVER_ERROR },
        );
    }

}