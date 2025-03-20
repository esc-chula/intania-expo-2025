import { SEPARATOR } from "@/lib/config";
import { last } from "radash";

/** An Intania Expo 2025 visitor. */
export default class Visitor {
  /** The role of the user. */
  static #role = "visitor";
  /**
   * The six-digit code, formatted like `S-12345`.
   * The first character is the category.
   */
  #sixDigitCode: string;
  /** First name. */
  #name: string;
  /** Last name. */
  #surname: string;
  /** Gender. */
  #gender: "M" | "F" | "NB" | "N/A";
  /** Phone number, formatted with only numbers. */
  #phone: string;
  /** The category of the visitor. */
  #category: keyof typeof Visitor.categoryList;
  /** The date and time of all visits. */
  #visitDates: Date[];

  /**
   * A list of visitor categories.
   *
   * Each category is represented by a key-value pair:
   * - The key represents what is stored in the database.
   * - The value has `code`, the first character in the six-digit code, and
   *   `name`, the display name.
   */
  static get categoryList() {
    return Object.fromEntries(
      [
        ["student", "S", "นักเรียน/ผู้สนใจศึกษาต่อ"],
        ["university", "U", "นักศึกษาต่างมหาลัยฯ"],
        ["cuOrAlumni", "C", "นิสิตปัจจุบัน/ศิษย์เก่า วิศวฯ จุฬา"],
        ["teacher", "T", "ครู"],
        ["other", "O", "ผู้ปกครอง/บุคคลภายนอก"],
      ].map(([key, code, name]) => [key, { code, name }]),
    );
  }

  /**
   * Whether the given six-digit code is valid.
   * @param code The six-digit code.
   * @returns A boolean.
   */
  static isValidCode(code: string) {
    return /^[SUCTO]-\d{5}$/.test(code);
  }

  constructor(
    sixDigitCode: string,
    name: string,
    surname: string,
    gender: Visitor["gender"],
    phone: string,
    category: keyof typeof Visitor.categoryList,
    visitDates: Date[],
  ) {
    this.#sixDigitCode = sixDigitCode;
    this.#name = name;
    this.#surname = surname;
    this.#gender = gender;
    this.#phone = phone;
    this.#category = category;
    this.#visitDates = visitDates;
  }

  /** First and last name combined. */
  get fullName() {
    return `${this.#name} ${this.#surname}`;
  }

  /** Phone number in XXX XXX XXXX format. */
  get formattedPhone() {
    return this.#phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
  }

  /** The display name of the category. */
  get formattedCategory() {
    return Visitor.categoryList[this.#category].name;
  }

  /** The display string of the most recent visit date. */
  get formattedVisitDate() {
    const mostRecentVisitDate = last(this.#visitDates);
    return [
      mostRecentVisitDate?.toLocaleDateString("th-TH", {
        weekday: "long",
        day: "numeric",
        month: "short",
      }),
      mostRecentVisitDate?.toLocaleTimeString("th-TH", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    ].join(SEPARATOR);
  }

  // Standard getters
  get role() {
    return Visitor.#role;
  }
  get sixDigitCode() {
    return this.#sixDigitCode;
  }
  get name() {
    return this.#name;
  }
  get surname() {
    return this.#surname;
  }
  get gender() {
    return this.#gender;
  }
  get phone() {
    return this.#phone;
  }
  get category() {
    return this.#category;
  }
  get visitDates() {
    return this.#visitDates;
  }
}
