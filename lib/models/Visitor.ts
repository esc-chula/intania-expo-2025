import splitIfString from "@/lib/helpers/splitIfString";
import Database, { DatabaseResponse } from "@/lib/models/Database";
import User, { UserRole } from "@/lib/models/User";

export enum GENDER {
  Male = "MALE",
  Female = "FEMALE",
  NotGiven = "NOT_GIVEN",
  Other = "OTHER",
}

export enum VISITOR_CATEGORY {
  Student = "STUDENT",
  Intania = "INTANIA",
  CollegeStudent = "COLLEGE_STUDENT",
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
      [VISITOR_CATEGORY.CollegeStudent]: "นิสิตจากคณะ/มหาลัยอื่น",
      [VISITOR_CATEGORY.Teacher]: "ครู",
      [VISITOR_CATEGORY.Other]: "ผู้ปกครอง/บุคคลภายนอก",
    }[category];
  }

  static isValidCode(code: string) {
    return /^[SICTO]-\d{5}$/.test(code);
  }

  constructor(data: {
    name: string;
    surname: string;
    gender: string;
    phone: string;
    email: string;
    category: string;
    visitDates: string | string[];
    interestedActivities: string | string[];
    referralSource: string | string[];
  }) {
    super(data.email, Visitor.#role);
    this.#name = data.name;
    this.#surname = data.surname;
    this.#gender = data.gender as GENDER;
    this.#phone = data.phone;
    this.#category = data.category as VISITOR_CATEGORY;
    this.#visitDates = splitIfString(data.visitDates).map(
      (date) => new Date(date),
    );
    this.#interestedActivities = splitIfString<
      keyof typeof Visitor.INTERESTED_ACTIVITIES
    >(data.interestedActivities);
    this.#referralSources = splitIfString<
      keyof typeof Visitor.REFERRAL_SOURCES
    >(data.referralSource);
  }

  async save(data?: object): Promise<DatabaseResponse> {
    return await Database.fetch("POST", "/visitors", {
      name: this.#name,
      surname: this.#surname,
      gender: this.#gender,
      phone: this.#phone,
      email: this.email,
      category: this.#category,
      visitDates: this.#visitDates.map(
        (date) => date.toISOString().split("T")[0],
      ),
      interestedActivities: this.#interestedActivities,
      referralSources: this.#referralSources,
      ...data,
    });
  }

  get fullName() {
    return [this.#name, this.#surname].join(" ");
  }

  get formattedPhone() {
    return this.#phone.replace(/(\d{3})(\d{3})(\d{4})/, (_, p1, p2, p3) =>
      [p1, p2, p3].join(" "),
    );
  }

  get formattedCategory() {
    return Visitor.getCategoryDisplayName(this.#category);
  }

  get formattedLastVisitDate() {
    return "วันศุกร์ 28 เม.ย. • 09:41";
  }

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
