import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { ACCESS_TOKEN_EXPIRES, REFRESH_TOKEN_EXPIRES } from "./jwt";
import { TokenInfo } from "./types/token";

export function setJwtToken(
  cookieStore: ReadonlyRequestCookies,
  accessToken: string,
  refreshToken: string,
  tokenId: string,
) {
  cookieStore.set({
    name: "accessToken",
    value: accessToken,
    path: "/",
    expires: ACCESS_TOKEN_EXPIRES * 1000,
    maxAge: ACCESS_TOKEN_EXPIRES,
    secure: true,
    httpOnly: true,
    sameSite: "lax",
  });
  cookieStore.set({
    name: "refreshToken",
    value: refreshToken,
    path: "/",
    expires: REFRESH_TOKEN_EXPIRES * 1000,
    maxAge: REFRESH_TOKEN_EXPIRES,
    secure: true,
    httpOnly: true,
    sameSite: "lax",
  });
  cookieStore.set({
    name: "tokenId",
    value: tokenId,
    path: "/",
    expires: REFRESH_TOKEN_EXPIRES * 1000,
    maxAge: REFRESH_TOKEN_EXPIRES,
    secure: true,
    httpOnly: true,
    sameSite: "lax",
  });
}

export function getJwtToken(cookieStore: ReadonlyRequestCookies): TokenInfo {
  const accessToken = cookieStore.get("accessToken");
  const refreshToken = cookieStore.get("refreshToken");
  const tokenId = cookieStore.get("tokenId");
  return {
    accessToken: accessToken?.value || "",
    refreshToken: refreshToken?.value || "",
    tokenId: tokenId?.value || "",
  };
}

export function deleteJwtToken(cookieStore: ReadonlyRequestCookies) {
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("tokenId");
}
