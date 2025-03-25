import User, { USER_ROLE } from "@/lib/models/User";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;
  const redirect = (url: string) =>
    NextResponse.redirect(new URL(url, request.url).toString());

  // | Page      | Public | Authorized | Registered | Staff     |
  // |-----------|--------|------------|------------|-----------|
  // | /         | null   | /terms     | /home      | /staff    |
  // | /home     | /      | /terms     | null       | /staff    |
  // | /terms    | /      | null       | /home      | /staff    |
  // | /register | /      | null       | /home      | /staff    |
  // | /staff    | /      | /terms     | /home      | null      |
  // | /scan     | /      | /terms     | /home      | null      |

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (accessToken) {
    // Decode the JWT payload. If the payload is invalid, delete the access
    // token and redirect to the home page.
    // (Using `decode` here because verification is done by the API.)
    const jwtPayload = jwt.decode(accessToken.value);
    if (!jwtPayload || typeof jwtPayload == "string") {
      cookieStore.delete("accessToken");
      return redirect("/");
    }
    // If the user is a visitor, check if they have registered.
    // As shown in the table above, some pages are only accessible to
    // unregistered visitors and some to registered visitors.
    const { role } = jwtPayload as { role: USER_ROLE };
    const isRegistered =
      role === USER_ROLE.Visitor &&
      (await User.isRegistered(cookieStore)).response;

    if (role === USER_ROLE.Staff) {
      if (!["/staff", "/scan", "/scan/manual"].includes(url))
        return redirect("/staff");
    } else if (isRegistered) {
      if (url !== "/home") return redirect("/home");
    } else if (!["/terms", "/register"].includes(url))
      return redirect("/terms");
  } else if (url !== "/") return redirect("/");

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/home",
    "/terms",
    "/register",
    "/staff",
    "/scan",
    "/scan/manual",
  ],
};
