import { getOAuthSignInUrl } from "@/lib/backend/oauth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const redirectUrl = new URL(request.url).searchParams.get("redirect") || "";
  return NextResponse.redirect(getOAuthSignInUrl(redirectUrl));
}
