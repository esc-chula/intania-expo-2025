//Get all major name
import { prisma } from "@/lib/backend/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  let majors = await prisma.major.findMany({
    select:{
      id:true,
      name:true
    }
  });
  return NextResponse.json(majors, {status:200});
}