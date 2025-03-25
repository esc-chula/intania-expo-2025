import Database, { DatabaseResponse } from "@/lib/models/Database";
import { cookies } from "next/headers";

export enum USER_ROLE {
  Staff = "EXPO_STAFF",
  Visitor = "VISITOR",
}

type CookieStore = Awaited<ReturnType<typeof cookies>>;

export default class User {
  #id: string;
  #email: string;
  #role: USER_ROLE;

  constructor(id: string, email: string, role: USER_ROLE) {
    this.#id = id;
    this.#email = email;
    this.#role = role;
  }

  static async signOut() {
    await Database.fetch("POST", "/auth/signout");
  }

  /**
   * Check if the authorized user has submitted the registration form. Uses
   * `sixDigitCode` as the indicator under the hood.
   *
   * @param cookieStore The cookie store.
   */
  static async isRegistered(cookieStore: CookieStore) {
    const { data, status, ok } = await Database.fetch<{
      isRegistered: boolean;
    }>("GET", "/auth/is-registered", undefined, {
      headers: { Cookie: cookieStore.toString() },
    });
    return { response: data?.isRegistered || false, status, ok };
  }

  /**
   * Fetches the authorized user from client cookies.
   * @param cookieStore The cookie store.
   */
  static async fromCookies(
    cookieStore: CookieStore,
  ): Promise<DatabaseResponse<User | null>> {
    const { data, status, ok } = await Database.fetch<{
      id: string;
      email: string;
    }>("GET", "/visitors/me", undefined, {
      headers: { Cookie: cookieStore.toString() },
    });
    let user: User | null = null;
    if (ok) user = new User(data.id, data.email, USER_ROLE.Visitor);
    return { data: user, status, ok } as DatabaseResponse<User | null>;
  }

  get id() {
    return this.#id;
  }
  get email() {
    return this.#email;
  }
  get role() {
    return this.#role;
  }
}
