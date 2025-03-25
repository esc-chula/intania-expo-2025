import User from "@/lib/models/User";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;
  const redirect = (url: string) =>
    NextResponse.redirect(new URL(url, request.url).toString());

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
      if (url !== "/home") return redirect("/home");
    } else if (["/", "/home"].includes(url)) return redirect("/terms");
  } else if (url !== "/") return redirect("/");

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home", "/terms", "/register", "/scan"],
};
