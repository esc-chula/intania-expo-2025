import Major from "@/lib/models/Major";
import Province from "@/lib/models/Province";
import Visitor from "@/lib/models/Visitor";

export default class StudentVisitor extends Visitor {
  #studentLevel: string;
  #studyStream: keyof typeof StudentVisitor.STUDY_STREAMS | null;
  #school: string;
  #province: Province;
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

  constructor(
    data: ConstructorParameters<typeof Visitor>[0] & {
      studentLevel: string;
      studyStream: keyof typeof StudentVisitor.STUDY_STREAMS | null;
      school: string;
      province: Province["code"];
      interestLevel: number;
      interestedField: Major[];
      emergencyContact: string;
    },
  ) {
    super(data);
    this.#studentLevel = data.studentLevel;
    this.#studyStream = data.studyStream;
    this.#school = data.school;
    this.#province = Province.fromCode(data.province)!;
    this.#interestLevel = data.interestLevel;
    this.#interestedField = data.interestedField;
    this.#emergencyContact = data.emergencyContact;
  }

  async save() {
    // Save to database
  }
}
