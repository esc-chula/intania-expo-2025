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

export default class Visitor extends User {
  static #role = UserRole.staff;

  static STUDY_STREAMS = {
    SCI: "สายวิทย์",
    ART: "สายศิลป์",
    VOC: "ปวช.",
    OTHER: "อื่น ๆ",
  };

  static INTERESTED_ACTIVITIES = {
    WOKRSHOP: "Workshop",
    SHOWCASE: "Showcase & Sharing Session",
    INNOVATION: "Innovation",
    CLUB: "Club & CSR",
    HALL: "Hall & Stage",
    COMPETITION: "Competition",
    OTHER: "กิจกรรมอื่น ๆ ในงาน",
  };

  static REFERAL_SOURCES = {
    IG_CU: "Instagram (@cuopenhouse)",
    IG_INTANIA: "Instagram (@cuintaniaopenhouse)",
    FACEBOOK: "Facebook",
    FRIENDS_FAMILY: "เพื่อน/ครอบครัว",
    ADVERTISEMENT: "โฆษณา",
  };

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

  static getStudyStreamDisplayName(stream: keyof typeof Visitor.STUDY_STREAMS) {
    return Visitor.STUDY_STREAMS[stream];
  }

  constructor() {
    super();
  }

  async save() {}
}
