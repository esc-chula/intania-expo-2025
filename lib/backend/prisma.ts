import { Prisma, PrismaClient } from "@prisma/client";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";
import { HTTPError } from "./types/httpError";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export function returnPrismaError(
  error: unknown,
  errorCases: {
    code: string;
    msg: string;
    status: number;
  }[],
): NextResponse<HTTPError> {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    for (let i = 0; i < errorCases.length; i++) {
      if (error.code == errorCases[i].code) {
        return NextResponse.json(
          { error: errorCases[i].msg },
          { status: errorCases[i].status },
        );
      }
    }
  }

  return NextResponse.json(
    { error: ReasonPhrases.INTERNAL_SERVER_ERROR },
    { status: StatusCodes.INTERNAL_SERVER_ERROR },
  );
}
