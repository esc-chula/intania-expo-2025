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
            select: {
                id: true,
                email: true,
                role: true,
                sixDigitCode: true,
                incrementCode: true,
                name: true,
                surname: true,
                gender: true,
                phone: true,
                category: true,
                visitDates: true,
                interestedActivities: true,
                referralSources: true,
                studentLevel: true,
                studyStream: true,
                school: true,
                province: true,
                interestLevel: true,
                interestedFields: true,
                emergencyContact: true,
                universityYear: true,
                faculty: true,
                university: true,
                alumniBatch: true,
                teacherSchool: true,
                teacherProvince: true,
                subjectTaught: true,
                workshopId: false, // Exclude workshopId
            },
        });
        return NextResponse.json(user, { status: StatusCodes.OK });
    } catch (error) {
        return returnPrismaError(error, [
            { code: 'P2025', msg: 'visitor not found', status: StatusCodes.NOT_FOUND },
            { code: 'P2023', msg: 'visitor not found', status: StatusCodes.NOT_FOUND },
        ]);
    }
}