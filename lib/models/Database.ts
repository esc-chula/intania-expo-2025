import type { HTTP_METHOD } from "next/dist/server/web/http";
import { mapValues, tryit } from "radash";

export default class Database {
  static async fetch<ExpectedData extends object = Record<string, string>>(
    method: HTTP_METHOD,
    endpoint: string,
    body: Record<string, unknown> = {},
    options: RequestInit = {},
  ): Promise<
    | { data: ExpectedData; status: number; ok: true }
    | { data: null; status: number | null; ok: false }
  > {
    if (method === "GET" && Object.keys(body).length > 0)
      endpoint += `?${new URLSearchParams(
        mapValues(body, (value) => String(value)),
      ).toString()}`;

    console.log("[Expo Database]", method, endpoint);

    const [error, response] = await tryit(fetch)(`/api/${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      ...(method !== "GET" && { body: JSON.stringify(body) }),
      ...options,
    });

    if (error) console.error("[Expo Database]", method, endpoint, `\n` + error);
    if (!response) return { data: null, status: null, ok: false };

    return {
      data: await response.json(),
      status: response.status,
      ok: response.ok,
    };
  }
}
