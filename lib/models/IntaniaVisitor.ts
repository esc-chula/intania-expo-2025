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
}
