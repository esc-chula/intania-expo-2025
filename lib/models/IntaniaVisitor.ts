import Database from "@/lib/models/Database";
import Visitor from "@/lib/models/Visitor";

export default class IntaniaVisitor extends Visitor {
  #alumniBatch: string;

  constructor(
    data: ConstructorParameters<typeof Visitor>[0] & {
      alumniBatch: string;
    },
  ) {
    super(data);
    this.#alumniBatch = data.alumniBatch;
  }

  async save() {
    return await Database.fetch("POST", "/visitors", {
      name: this.name,
      surname: this.surname,
      gender: this.gender,
      phone: this.phone,
      email: this.email,
      category: this.category,
      visitDates: this.visitDates.map(
        (date) => date.toISOString().split("T")[0],
      ),
      interestedActivities: this.interestedActivities,
      referralSource: this.referralSources,
      alumniBatch: this.#alumniBatch,
    });
  }
}
