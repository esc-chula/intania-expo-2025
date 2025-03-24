import { NextResponse } from 'next/server';
import { prisma, returnPrismaError } from '@/lib/backend/prisma';
import { StatusCodes } from 'http-status-codes';
import { VisitorDetails } from "@/lib/backend/types/user";
import { HTTPError } from "@/lib/backend/types/httpError";

export async function GET(request: Request, { params }: { params: Promise<{ sixDigitCode: string }> }): Promise<NextResponse<VisitorDetails | HTTPError>> {
    const { sixDigitCode } = await params;

    try {
        const user = await prisma.user.findFirstOrThrow({
            where: { sixDigitCode: sixDigitCode },
        });
        return NextResponse.json(user, { status: StatusCodes.OK });
    } catch (error) {
        return returnPrismaError(error, [
            { code: 'P2025', msg: 'visitor not found', status: StatusCodes.NOT_FOUND },
            { code: 'P2023', msg: 'visitor not found', status: StatusCodes.NOT_FOUND },
        ]);
    }
}