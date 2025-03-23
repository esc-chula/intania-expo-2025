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
  #visitDate: Date[];
  #interestedActivities: (typeof Visitor.INTERESTED_ACTIVITIES)[];
  #referralSource: (typeof Visitor.REFERAL_SOURCES)[];
  // #studentLevel: string | null;
  // #studyStream: string | null;
  // #school: string | null;
  // #province: string | null;
  // #interestLevel: number | null;
  // #interestedField: Major[] | null;
  // #emergencyContact: string | null;
  // #universityYear: string | null;
  // #faculty: string | null;
  // #university: string | null;
  // #alumniBatch: string | null;
  // #teacherSchool: string | null;
  // #teacherProvince: string | null;
  // #subjectTaught: string | null;

  static readonly INTERESTED_ACTIVITIES = {
    WOKRSHOP: "Workshop",
    SHOWCASE: "Showcase & Sharing Session",
    INNOVATION: "Innovation",
    CLUB: "Club & CSR",
    HALL: "Hall & Stage",
    COMPETITION: "Competition",
    OTHER: "กิจกรรมอื่น ๆ ในงาน",
  } as const;

  static readonly REFERAL_SOURCES = {
    FRIEND: "เพื่อน",
    SCHOOL: "โรงเรียน",
    SOCIAL_MEDIA: "โซเชียลมีเดีย",
    OTHER: "อื่นๆ",
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

  constructor(data: {
    name: string,
    surname: string,
    gender: GENDER,
    phone: string,
    email: string,
    category: VISITOR_CATEGORY,
    visitDate: string[],
    interestedActivities: (typeof Visitor.INTERESTED_ACTIVITIES)[],
    referralSource: (typeof Visitor.REFERAL_SOURCES)[],
  }) {
    super(data.email, Visitor.#role);
    this.#name = data.name;
    this.#surname = data.surname;
    this.#gender = data.gender;
    this.#phone = data.phone;
    this.#category = data.category;
    this.#visitDate = data.visitDate.map((date) => new Date(date));
    this.#interestedActivities = data.interestedActivities;
    this.#referralSource = data.referralSource;
  }

  abstract save(): Promise<void>;

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
  get visitDate() {
    return this.#visitDate;
  }
}
