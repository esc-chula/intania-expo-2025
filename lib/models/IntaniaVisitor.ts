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
    return await super.save({
      alumniBatch: this.#alumniBatch,
    });
  }

  get formattedAlumniBatch() {
    return "วศ." + this.#alumniBatch;
  }

  get ticketHighlight() {
    return { label: "ปีที่จบ/จะจบ", value: this.formattedAlumniBatch };
  }

  // Standard getters
  get alumniBatch() {
    return this.#alumniBatch;
  }
}
