import { prisma } from "@/lib/backend/prisma";
import { Major } from "@/lib/backend/types/major";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export async function GET(request:Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try{
    const major = await prisma.major.findFirstOrThrow({
      where : {
        id:id
      }
    });
    return NextResponse.json(major, {status:200});
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError){
      if (error.code == "P2025"){
					return NextResponse.json("not found",{status:404});
      } else {
        return NextResponse.json(error, {status:500});
      }
    }
  }
}