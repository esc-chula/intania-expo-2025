import Province from "@/lib/models/Province";
import Visitor from "@/lib/models/Visitor";

export default class TeacherVisitor extends Visitor {
  #school: string;
  #province: Province;
  #subjectTaught: string;

  constructor(
    data: ConstructorParameters<typeof Visitor>[0] & {
      school: string;
      province: string;
      subjectTaught: string;
    },
  ) {
    super(data);
    this.#school = data.school;
    this.#province = Province.fromCode(data.province)!;
    this.#subjectTaught = data.subjectTaught;
  }

  async save() {
    // Save to database
  }
}
