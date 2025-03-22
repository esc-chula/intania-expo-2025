import { isOneOfRole, onlyAuthorized } from "@/lib/backend/middleware";
import { prisma, returnPrismaError } from "@/lib/backend/prisma";
import { StatusCodes } from "http-status-codes";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function PUT(
  request : Request,
  {params} : {params: Promise<{sixDigitCode : string}>}){
  const {sixDigitCode} = await params;
  const cookieStore = await cookies();

  const middlewareResponse = onlyAuthorized(cookieStore);
  if (!middlewareResponse.pass){
    return middlewareResponse.response!;
  }
  const { payload } = middlewareResponse.data!;
  const middlewareResponse2 = isOneOfRole(["EXPO_STAFF"], payload);
  if (!middlewareResponse2.pass) {
    return middlewareResponse2.response!;
  }
  const user = await prisma.user.findFirst({ where: { email: payload.email } });
  if (!user) {
    return NextResponse.json(
      { error: "staff not found" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }
  if (user.role != "EXPO_STAFF") {
    return NextResponse.json(
      { error: "invalid role" },
      { status: StatusCodes.FORBIDDEN },
    );
  }

  try{
    let visitor = await prisma.user.findFirstOrThrow({
      where:{
        sixDigitCode:sixDigitCode
      }
    })
    if (visitor.visitDate !== null){
      return NextResponse.json(
        {error : "already checked in"},
        {status: StatusCodes.CONFLICT}
      )
    } 
    visitor = await prisma.user.update({
      where:{
        sixDigitCode:sixDigitCode
      },
      data:{
        visitDate : new Date()
      }
    });
    return NextResponse.json(visitor, {status:StatusCodes.OK});

  } catch (error) { // error
    return returnPrismaError(error, [
      {
        code: "P2025",
        msg: "invalid six digit code",
        status: StatusCodes.NOT_FOUND,
      }
    ]);
  }


  
}
