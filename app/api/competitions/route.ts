import { prisma } from "@/lib/backend/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const competitions = await prisma.competition.findMany({
  })
  return NextResponse.json(competitions, {status:200});
}
