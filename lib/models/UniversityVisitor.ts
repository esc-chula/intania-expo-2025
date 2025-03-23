import Visitor from "@/lib/models/Visitor";

export default class UniversityVisitor extends Visitor {
  #universityYear: string;
  #faculty: string;
  #university: string;

  constructor(
    data: ConstructorParameters<typeof Visitor>[0] & {
      universityYear: string;
      faculty: string;
      university: string;
    },
  ) {
    super(data);
    if (!data.universityYear.length) throw new Error("Invalid university year");
    this.#universityYear = data.universityYear;
    this.#faculty = data.faculty;
    this.#university = data.university;
  }

  async save() {
    return await super.save({
      universityYear: this.#universityYear,
      faculty: this.#faculty,
      university: this.#university,
    });
  }
}
