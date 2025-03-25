import User from "@/lib/models/User";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;
  let redirect = null;

  // | Page      | Public | Authorized | Registered |
  // |-----------|--------|------------|------------|
  // | /         | null   | /terms     | /home      |
  // | /home     | /      | /terms     | null       |
  // | /terms    | /      | null       | /home      |
  // | /register | /      | null       | /home      |

  const cookieStore = await cookies();
  const isAuthorized = cookieStore.has("accessToken");
  if (isAuthorized) {
    const isRegistered = (await User.isRegistered(cookieStore)).response;
    if (isRegistered) {
      if (url !== "/home") redirect = "/home";
    } else if (["/", "/home"].includes(url)) redirect = "/terms";
  } else if (url !== "/") redirect = "/";

  if (redirect)
    return NextResponse.redirect(new URL(redirect, request.url).toString());
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home", "/terms", "/register", "/scan"],
};
