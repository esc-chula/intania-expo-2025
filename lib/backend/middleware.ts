import { Role } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";
import { parseToken, Payload } from "./jwt";
import { HTTPError } from "./types/httpError";

export interface MiddlewareResponse<T> {
  pass: boolean;
  response?: NextResponse<HTTPError>;
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
        { error: "authorization header not found" },
        { status: StatusCodes.UNAUTHORIZED },
      ),
    };
  }

  const accessToken = authHeader.split(" ")[1]; // "Bearer ........"
  const payload = parseToken(accessToken);
  if (!payload) {
    return {
      pass: false,
      response: NextResponse.json(
        { error: "invalid authorization token" },
        { status: StatusCodes.UNAUTHORIZED },
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
      response: NextResponse.json(
        { error: "invalid role" },
        { status: StatusCodes.FORBIDDEN },
      ),
    };
  }
  return { pass: true };
}
