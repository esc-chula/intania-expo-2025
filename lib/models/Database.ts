import type { HTTP_METHOD } from "next/dist/server/web/http";
import { mapValues, tryit } from "radash";

/** A failed response from the database. */
export type DatabaseResponseError = {
  data: null;
  status: number | null;
  ok: false;
};

/** A successful response from the database. */
export type DatabaseResponseSuccess<
  ExpectedData extends object | null = object,
> = {
  data: ExpectedData;
  status: number;
  ok: true;
};

/** A response from the database. */
export type DatabaseResponse<ExpectedData extends object | null = object> =
  | DatabaseResponseError
  | DatabaseResponseSuccess<ExpectedData>;

const LOG_IDENIFIER = "[Expo Database]";

/** An interface for interacting with the database. */
export default class Database {
  /**
   * Fetch data from the database.
   *
   * @param method The HTTP method to use, i.e. GET, POST, PUT, DELETE.
   * @param endpoint The endpoint to fetch data from (omit `/api/`).
   * @param body The body / query parameters for the request.
   * @param options Additional options to pass to the Fetch API.
   *
   * @returns The response from the database.
   */
  static async fetch<ExpectedData extends object = Record<string, string>>(
    method: HTTP_METHOD,
    endpoint: string,
    body: Record<string, unknown> = {},
    options: RequestInit = {},
  ): Promise<DatabaseResponse<ExpectedData>> {
    if (method === "GET" && Object.keys(body).length > 0)
      endpoint += `?${new URLSearchParams(
        mapValues(body, (value) => String(value)),
      ).toString()}`;

    console.log(LOG_IDENIFIER, method, endpoint);

    const [error, response] = await tryit(fetch)(
      `${process.env.APP_URL}/api${endpoint}`,
      {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        ...(method !== "GET" && { body: JSON.stringify(body) }),
        ...options,
      },
    );

    const data = await response?.json();

    if (error) console.error(LOG_IDENIFIER, method, endpoint, `\n` + error);
    if (!response) return { data: null, status: null, ok: false };
    if (!response?.ok)
      console.error(LOG_IDENIFIER, method, endpoint, `\n` + data.error);

    return { data, status: response.status, ok: response.ok };
  }
}
