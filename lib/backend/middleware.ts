import { Role } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { NextResponse } from "next/server";
import { getJwtToken } from "./cookie";
import { parseToken, Payload } from "./jwt";
import { HTTPError } from "./types/httpError";

export interface MiddlewareResponse<T> {
  pass: boolean;
  response?: NextResponse<HTTPError>;
  data?: T;
}

export type AuthorizeResult = {
  accessToken: string;
  refreshToken: string;
  tokenId: string;
  payload: Payload;
};

export function onlyAuthorized(
  cookieStore: ReadonlyRequestCookies,
): MiddlewareResponse<AuthorizeResult> {
  const { accessToken, refreshToken, tokenId } = getJwtToken(cookieStore);
  if (accessToken == "" || refreshToken == "" || tokenId == "") {
    return {
      pass: false,
      response: NextResponse.json(
        { error: "authorization header not found" },
        { status: StatusCodes.UNAUTHORIZED },
      ),
    };
  }

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
    data: { accessToken, refreshToken, tokenId, payload },
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
