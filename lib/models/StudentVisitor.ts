import Visitor, {
  GENDER,
  PROVINCES,
  VISITOR_CATEGORY,
} from "@/lib/models/Visitor";
import { Major } from "@prisma/client";

export default class StudentVisitor extends Visitor {
  #studentLevel: string;
  #studyStream: keyof typeof StudentVisitor.STUDY_STREAMS | null;
  #school: string;
  #province: keyof typeof PROVINCES;
  #interestLevel: number;
  #interestedField: Major[];
  #emergencyContact: string;

  static readonly STUDY_STREAMS = {
    SCI: "สายวิทย์",
    ART: "สายศิลป์",
    VOC: "ปวช.",
    OTHER: "อื่น ๆ",
  } as const;

  static getStudyStreamDisplayName(
    stream: keyof typeof StudentVisitor.STUDY_STREAMS,
  ) {
    return StudentVisitor.STUDY_STREAMS[stream];
  }

  // constructor use all the fields from Visitor and add the new fields too
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
    studentLevel: string,
    studyStream: keyof typeof StudentVisitor.STUDY_STREAMS | null,
    school: string,
    province: keyof typeof PROVINCES,
    interestLevel: number,
    interestedField: Major[],
    emergencyContact: string,
  ) {
    super(
      name,
      surname,
      gender,
      phone,
      email,
      category,
      visitDate,
      interestedActivities,
      referralSource,
    );
    this.#studentLevel = studentLevel;
    this.#studyStream = studyStream;
    this.#school = school;
    this.#province = province;
    this.#interestLevel = interestLevel;
    this.#interestedField = interestedField;
    this.#emergencyContact = emergencyContact;
  }

  async save() {
    // Save to database
  }
}
