import { cookies } from "next/headers";
import Database, { DatabaseResponse } from "./Database";

export enum UserRole {
  staff = "STAFF",
  visitor = "VISITOR",
}

export default class User {
  #email: string;
  #role: UserRole;

  constructor(email: string, role: UserRole) {
    this.#email = email;
    this.#role = role;
  }

  /**
   * Fetches the authorized user from client cookies.
   * @param cookieStore The cookie store.
   */
  static async fromCookies(
    cookieStore: Awaited<ReturnType<typeof cookies>>,
  ): Promise<DatabaseResponse<User | null>> {
    const { data, status, ok } = await Database.fetch<{
      email: string;
    }>("GET", "/visitors/me", undefined, {
      headers: { Cookie: cookieStore.toString() },
    });
    let user: User | null = null;
    if (ok) user = new User(data.email, UserRole.visitor);
    return { data: user, status, ok } as DatabaseResponse<User | null>;
  }

  get email() {
    return this.#email;
  }
  get role() {
    return this.#role;
  }
}
