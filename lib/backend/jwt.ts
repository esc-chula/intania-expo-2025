import { Role } from "@prisma/client";
import jwt from "jsonwebtoken";

export type Payload = {
  email: string;
  role: Role;
};

const JWT_SECRET = process.env.JWT_SECRET!;
export const ACCESS_TOKEN_EXPIRES = Number(process.env.ACCESS_TOKEN_EXPIRES!);
export const REFRESH_TOKEN_EXPIRES = Number(process.env.REFRESH_TOKEN_EXPIRES!);

export function generateToken(payload: Payload): {
  accessToken: string;
  refreshToken: string;
} {
  const accessToken = jwt.sign(payload, JWT_SECRET, {
    issuer: "intania-expo-2025-api",
    subject: "access-token",
    expiresIn: ACCESS_TOKEN_EXPIRES,
  });
  const refreshToken = jwt.sign(payload, JWT_SECRET, {
    issuer: "intania-expo-2025-api",
    subject: "refresh-token",
    expiresIn: REFRESH_TOKEN_EXPIRES,
  });
  return { accessToken, refreshToken };
}

export function parseToken(token: string): {
  payload: Payload | undefined;
  error: Error | undefined;
} {
  try {
    const x = jwt.verify(token, JWT_SECRET);
    return { payload: x as Payload, error: undefined };
  } catch (error) {
    return { payload: undefined, error: error as Error };
  }
}

export function verifyToken(token: string): boolean {
  return parseToken(token) !== null;
}
