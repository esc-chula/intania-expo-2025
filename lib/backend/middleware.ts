import { Role } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { TokenExpiredError } from "jsonwebtoken";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { NextResponse } from "next/server";
import { getJwtToken, setJwtToken } from "./cookie";
import { generateToken, parseToken, Payload } from "./jwt";
import { prisma } from "./prisma";
import { HTTPError } from "./types/httpError";
import { TokenInfo } from "./types/token";

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

export async function onlyAuthorized(
  cookieStore: ReadonlyRequestCookies,
): Promise<MiddlewareResponse<AuthorizeResult>> {
  let { accessToken, refreshToken, tokenId } = getJwtToken(cookieStore);
  if (accessToken == "" || refreshToken == "" || tokenId == "") {
    return {
      pass: false,
      response: NextResponse.json(
        { error: "authorization header not found" },
        { status: StatusCodes.UNAUTHORIZED },
      ),
    };
  }

  let payload: Payload | undefined = undefined;
  const parseResult = parseToken(accessToken);
  payload = parseResult.payload;
  if (!payload) {
    if (!(parseResult.error instanceof TokenExpiredError)) {
      return {
        pass: false,
        response: NextResponse.json(
          { error: "invalid authorization token" },
          { status: StatusCodes.UNAUTHORIZED },
        ),
      };
    }

    // try to refresh token
    const result = await tryRefreshToken(cookieStore, tokenId, refreshToken);
    if (!result) {
      return {
        pass: false,
        response: NextResponse.json(
          { error: "invalid authorization token" },
          { status: StatusCodes.UNAUTHORIZED },
        ),
      };
    }

    // set the new refreshed token info
    accessToken = result.accessToken;
    refreshToken = result.refreshToken;
    tokenId = result.tokenId;
    payload = result.payload;
  }

  return {
    pass: true,
    data: { accessToken, refreshToken, tokenId, payload },
  };
}

async function tryRefreshToken(
  cookieStore: ReadonlyRequestCookies,
  tokenId: string,
  refreshToken: string,
): Promise<(TokenInfo & { payload: Payload }) | null> {
  const result = await prisma.token.findFirst({
    where: { id: tokenId },
    select: { refreshToken: true },
  });
  if (!result) {
    return null;
  }
  if (result?.refreshToken != refreshToken) {
    return null;
  }

  const { payload } = parseToken(refreshToken);
  if (!payload) {
    return null;
  }

  const newToken = generateToken({
    email: payload.email,
    role: payload.role,
  });
  try {
    await prisma.token.update({
      where: { id: tokenId },
      data: {
        accessToken: newToken.accessToken,
        refreshToken: newToken.refreshToken,
      },
    });
  } catch (_) {
    return null;
  }

  setJwtToken(
    cookieStore,
    newToken.accessToken,
    newToken.refreshToken,
    tokenId,
  );

  return {
    accessToken: newToken.accessToken,
    refreshToken: newToken.refreshToken,
    tokenId,
    payload,
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
