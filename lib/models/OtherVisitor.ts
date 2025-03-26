import Visitor from "@/lib/models/Visitor";

export default class OtherVisitor extends Visitor {
  constructor(data: ConstructorParameters<typeof Visitor>[0]) {
    super(data);
  }

  async save() {
    return await super.save();
  }

  get ticketHighlight() {
    return { label: "อีเมลติดต่อ", value: this.email };
  }
}
