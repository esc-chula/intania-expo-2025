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

  get email() {
    return this.#email;
  }
  get role() {
    return this.#role;
  }
}
