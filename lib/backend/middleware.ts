import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { parseToken, Payload } from "./jwt";

export interface MiddlewareResponse<T> {
  pass: boolean;
  response?: NextResponse;
  data?: T;
}

export type AuthorizeResult = {
  accessToken: string;
  payload: Payload;
};

export function onlyAuthorized(
  request: Request,
): MiddlewareResponse<AuthorizeResult> {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    return {
      pass: false,
      response: NextResponse.json(
        { error: "Authorization header not found" },
        { status: 401 },
      ),
    };
  }

  const accessToken = authHeader.split(" ")[1]; // "Bearer ........"
  const payload = parseToken(accessToken);
  if (!payload) {
    return {
      pass: false,
      response: NextResponse.json(
        { error: "invalid Authorization token" },
        { status: 401 },
      ),
    };
  }

  return {
    pass: true,
    data: { accessToken, payload },
  };
}
export function isOneOfRole(
  roles: Role[],
  payload: Payload,
): MiddlewareResponse<undefined> {
  if (!roles.includes(payload.role)) {
    return {
      pass: false,
      response: NextResponse.json({ error: "invalid role" }, { status: 403 }),
    };
  }
  return { pass: true };
}
