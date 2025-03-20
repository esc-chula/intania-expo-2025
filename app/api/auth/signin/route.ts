import { getOAuthSignInUrl } from "@/lib/backend/oauth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.redirect(getOAuthSignInUrl());
}
