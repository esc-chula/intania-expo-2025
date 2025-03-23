import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(_: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    { source: "/" },
    { source: "/home" },
    { source: "/terms" },
    { source: "/register" },
  ],
};
