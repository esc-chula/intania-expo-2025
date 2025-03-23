import Visitor from "@/lib/models/Visitor";

export default class OtherVisitor extends Visitor {
  constructor(data: ConstructorParameters<typeof Visitor>[0]) {
    super(data);
  }

  async save() {
    // Save to database
    return { data: null, status: null, ok: false as const };
  }
}
