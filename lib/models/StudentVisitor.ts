import splitIfString from "@/lib/helpers/splitIfString";
import Major from "@/lib/models/Major";
import Province from "@/lib/models/Province";
import Visitor from "@/lib/models/Visitor";

export default class StudentVisitor extends Visitor {
  #studentLevel: string;
  #studyStream: keyof typeof StudentVisitor.STUDY_STREAMS | null;
  #school: string;
  #province: Province;
  #interestLevel: number;
  #interestedFields: Major[];
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
      studyStream?: string;
      school: string;
      province: string;
      interestLevel: string;
      interestedFields: string | string[];
      emergencyContact: string;
    },
  ) {
    super(data);
    this.#studentLevel = data.studentLevel;
    this.#studyStream =
      (data.studyStream as keyof typeof StudentVisitor.STUDY_STREAMS) || null;
    this.#school = data.school;
    this.#province = Province.fromCode(data.province)!;
    this.#interestLevel = parseInt(data.interestLevel);
    this.#interestedFields = splitIfString(data.interestedFields).map(
      (slug) => Major.fromSlug(slug)!,
    );
    this.#emergencyContact = data.emergencyContact;
  }

  async save() {
    return await super.save({
      studentLevel: this.#studentLevel,
      studyStream: this.#studyStream,
      school: this.#school,
      province: this.#province.code,
      interestLevel: this.#interestLevel.toString(),
      interestedFields: this.#interestedFields.map((field) => field.slug),
      emergencyContact: this.#emergencyContact,
    });
  }

  get ticketHighlight() {
    return { label: "โรงเรียน", value: this.#school };
  }
}
