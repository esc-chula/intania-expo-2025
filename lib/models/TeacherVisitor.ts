import Visitor, {
  GENDER,
  PROVINCES,
  VISITOR_CATEGORY,
} from "@/lib/models/Visitor";
import Province from "@/lib/models/Province";

export default class TeacherVisitor extends Visitor {
  #school: string;
  #province: Province;
  #subjectTaught: string;

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
    school: string,
    province: keyof typeof PROVINCES,
    subjectTaught: string,
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
    this.#school = school;
    this.#province = province;
    this.#subjectTaught = subjectTaught;
  }

  async save() {
    // Save to database
  }
}
