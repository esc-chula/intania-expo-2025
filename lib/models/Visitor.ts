import Database, { DatabaseResponse } from "@/lib/models/Database";
import IntaniaVisitor from "@/lib/models/IntaniaVisitor";
import OtherVisitor from "@/lib/models/OtherVisitor";
import StudentVisitor from "@/lib/models/StudentVisitor";
import TeacherVisitor from "@/lib/models/TeacherVisitor";
import UniversityVisitor from "@/lib/models/UniversityVisitor";
import User, { UserRole } from "@/lib/models/User";
import { DatabaseResponse } from "./Database";

export enum GENDER {
  Male = "MALE",
  Female = "FEMALE",
  NotGiven = "NOT_GIVEN",
  Other = "OTHER",
}

export enum VISITOR_CATEGORY {
  Student = "STUDENT",
  Intania = "INTANIA",
  University = "UNIVERSITY",
  Teacher = "TEACHER",
  Other = "OTHER",
}

export default abstract class Visitor extends User {
  static #role = UserRole.staff;

  #name: string;
  #surname: string;
  #gender: GENDER;
  #phone: string;
  #category: VISITOR_CATEGORY;
  #visitDates: Date[];
  #interestedActivities: (keyof typeof Visitor.INTERESTED_ACTIVITIES)[];
  #referralSources: (keyof typeof Visitor.REFERRAL_SOURCES)[];

  static readonly INTERESTED_ACTIVITIES = {
    WOKRSHOP: "Workshop",
    SHOWCASE: "Showcase & Sharing Session",
    INNOVATION: "Innovation",
    CLUB: "Club & CSR",
    HALL: "Hall & Stage",
    COMPETITION: "Competition",
    OTHER: "กิจกรรมอื่น ๆ ในงาน",
  } as const;

  static readonly REFERRAL_SOURCES = {
    INSTAGRAM_CU: "Instagram (@cuopenhouse)",
    INSTAGRAM_INTANIA: "Instagram (@cuintaniaopenhouse)",
    FACEBOOK: "Facebook",
    FRIEND: "เพื่อน/ครอบครัว",
    ADVERTISEMENT: "โมษณา",
  } as const;

  static getGenderDisplayName(gender: GENDER) {
    return {
      [GENDER.Male]: "ชาย",
      [GENDER.Female]: "หญิง",
      [GENDER.NotGiven]: "ไม่ต้องการระบุ",
      [GENDER.Other]: "อื่น ๆ",
    }[gender];
  }

  static getCategoryDisplayName(category: VISITOR_CATEGORY) {
    return {
      [VISITOR_CATEGORY.Student]: "นักเรียน/ผู้สนใจศึกษาต่อ",
      [VISITOR_CATEGORY.Intania]: "นิสิตปัจจุบัน/นิสิตเก่าวิศวะจุฬาฯ",
      [VISITOR_CATEGORY.University]: "นิสิตจากมหาลัยอื่น",
      [VISITOR_CATEGORY.Teacher]: "ครู",
      [VISITOR_CATEGORY.Other]: "ผู้ปกครอง/บุคคลภายนอก",
    }[category];
  }

  static fromData(data: object) {
    try {
      return new {
        [VISITOR_CATEGORY.Student]: StudentVisitor,
        [VISITOR_CATEGORY.Intania]: IntaniaVisitor,
        [VISITOR_CATEGORY.University]: UniversityVisitor,
        [VISITOR_CATEGORY.Teacher]: TeacherVisitor,
        [VISITOR_CATEGORY.Other]: OtherVisitor,
      }[
        (data as { category: VISITOR_CATEGORY }).category ||
          VISITOR_CATEGORY.Other
      ](
        // TypeScript shenanigans to merge all types of visitor data.
        // Defo not type-safe. Improvements welcome!
        data as ConstructorParameters<typeof StudentVisitor>[0] &
          ConstructorParameters<typeof IntaniaVisitor>[0] &
          ConstructorParameters<typeof UniversityVisitor>[0] &
          ConstructorParameters<typeof TeacherVisitor>[0] &
          ConstructorParameters<typeof OtherVisitor>[0],
      );
    } catch (_) {
      return null;
    }
  }

  constructor(data: {
    name: string;
    surname: string;
    gender: string;
    phone: string;
    email: string;
    category: string;
    visitDate: string;
    interestedActivities: string;
    referralSource: string;
  }) {
    super(data.email, Visitor.#role);
    this.#name = data.name;
    this.#surname = data.surname;
    this.#gender = data.gender as GENDER;
    this.#phone = data.phone;
    this.#category = data.category as VISITOR_CATEGORY;
    this.#visitDates = data.visitDate.split(",").map((date) => new Date(date));
    this.#interestedActivities = data.interestedActivities.split(
      ",",
    ) as (keyof typeof Visitor.INTERESTED_ACTIVITIES)[];
    this.#referralSources = data.referralSource.split(
      ",",
    ) as (keyof typeof Visitor.REFERRAL_SOURCES)[];
  }

  abstract save(): Promise<DatabaseResponse>;

  // Standard getters
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
  get interestedActivities() {
    return this.#interestedActivities;
  }
  get referralSources() {
    return this.#referralSources;
  }
}
