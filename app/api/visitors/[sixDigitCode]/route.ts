import { NextResponse } from 'next/server';
import { prisma, returnPrismaError } from '@/lib/backend/prisma';
import { StatusCodes } from 'http-status-codes';
import { Visitor } from "@/lib/backend/types/user";
import { HTTPError } from "@/lib/backend/types/httpError";

export async function GET(request: Request, { params }: { params: Promise<{ sixDigitCode: string }> }): Promise<NextResponse<Visitor | HTTPError>> {
    const { sixDigitCode } = await params;

    try {
        const event = await prisma.user.findFirstOrThrow({
            where: { sixDigitCode: sixDigitCode },
        });
        return NextResponse.json(event, { status: StatusCodes.OK });
    } catch (error) {
        return returnPrismaError(error, [
            { code: 'P2025', msg: 'Visitor not found', status: StatusCodes.NOT_FOUND },
            { code: 'P2023', msg: 'Visitor not found', status: StatusCodes.NOT_FOUND },
        ]);
    }
}