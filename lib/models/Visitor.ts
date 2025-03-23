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

export const PROVINCES = {
  KBI: "กระบี่",
  BKK: "กรุงเทพมหานคร",
  KRI: "กาญจนบุรี",
  KSN: "กาฬสินธุ์",
  KPT: "กำแพงเพชร",
  KKN: "ขอนแก่น",
  CTI: "จันทบุรี",
  CCO: "ฉะเชิงเทรา",
  CBI: "ชลบุรี",
  CNT: "ชัยนาท",
  CPM: "ชัยภูมิ",
  CPN: "ชุมพร",
  CRI: "เชียงราย",
  CMI: "เชียงใหม่",
  TRG: "ตรัง",
  TRT: "ตราด",
  TAK: "ตาก",
  NYK: "นครนายก",
  NPT: "นครปฐม",
  NPM: "นครพนม",
  NMA: "นครราชสีมา",
  NRT: "นครศรีธรรมราช",
  NSN: "นครสวรรค์",
  NBI: "นนทบุรี",
  NWT: "นราธิวาส",
  NAN: "น่าน",
  BKN: "บึงกาฬ",
  BRM: "บุรีรัมย์",
  PTE: "ปทุมธานี",
  PKN: "ประจวบคีรีขันธ์",
  PRI: "ปราจีนบุรี",
  PTN: "ปัตตานี",
  AYA: "พระนครศรีอยุธยา",
  PYO: "พะเยา",
  PNA: "พังงา",
  PLG: "พัทลุง",
  PCT: "พิจิตร",
  PLK: "พิษณุโลก",
  PBI: "เพชรบุรี",
  PNB: "เพชรบูรณ์",
  PRE: "แพร่",
  PKT: "ภูเก็ต",
  MKM: "มหาสารคาม",
  MDH: "มุกดาหาร",
  MSN: "แม่ฮ่องสอน",
  YST: "ยโสธร",
  YLA: "ยะลา",
  RET: "ร้อยเอ็ด",
  RNG: "ระนอง",
  RYG: "ระยอง",
  RBR: "ราชบุรี",
  LRI: "ลพบุรี",
  LPG: "ลำปาง",
  LPN: "ลำพูน",
  LEI: "เลย",
  SSK: "ศรีสะเกษ",
  SNK: "สกลนคร",
  SKA: "สงขลา",
  STN: "สตูล",
  SPK: "สมุทรปราการ",
  SKM: "สมุทรสงคราม",
  SKN: "สมุทรสาคร",
  SKW: "สระแก้ว",
  SRI: "สระบุรี",
  SBR: "สิงห์บุรี",
  STI: "สุโขทัย",
  SPB: "สุพรรณบุรี",
  SNI: "สุราษฎร์ธานี",
  SRN: "สุรินทร์",
  NKI: "หนองคาย",
  NBP: "หนองบัวลำภู",
  ATG: "อ่างทอง",
  ACR: "อำนาจเจริญ",
  UDN: "อุดรธานี",
  UTD: "อุตรดิตถ์",
  UTI: "อุทัยธานี",
  UBN: "อุบลราชธานี",
};

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

  static getProvinceDisplayName(province: keyof typeof PROVINCES) {
    return PROVINCES[province];
  }

  constructor(
    name: string,
    surname: string,
    gender: GENDER,
    phone: string,
    email: string,
    category: VISITOR_CATEGORY,
    visitDate: Date[],
    interestedActivities: (typeof Visitor.INTERESTED_ACTIVITIES)[],
    referralSource: (typeof Visitor.REFERAL_SOURCES)[],
  ) {
    super(email, Visitor.#role);
    this.#name = name;
    this.#surname = surname;
    this.#gender = gender;
    this.#phone = phone;
    this.#category = category;
    this.#visitDate = visitDate;
    this.#interestedActivities = interestedActivities;
    this.#referralSource = referralSource;
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
