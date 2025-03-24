import Database from "@/lib/models/Database";
import IntaniaVisitor from "@/lib/models/IntaniaVisitor";
import OtherVisitor from "@/lib/models/OtherVisitor";
import StudentVisitor from "@/lib/models/StudentVisitor";
import TeacherVisitor from "@/lib/models/TeacherVisitor";
import UniversityVisitor from "@/lib/models/UniversityVisitor";
import { VISITOR_CATEGORY } from "@/lib/models/Visitor";
import { cookies } from "next/headers";

export default class VisitorFactory {
  static fromData(data: Record<string, string>) {
    return new {
      [VISITOR_CATEGORY.Student]: StudentVisitor,
      [VISITOR_CATEGORY.Intania]: IntaniaVisitor,
      [VISITOR_CATEGORY.CollegeStudent]: UniversityVisitor,
      [VISITOR_CATEGORY.Teacher]: TeacherVisitor,
      [VISITOR_CATEGORY.Other]: OtherVisitor,
    }[
      (data as { category: VISITOR_CATEGORY }).category ||
        VISITOR_CATEGORY.Other
    ](
      // TypeScript shenanigans to merge all types of visitor data.
      // Defo not type-safe. Improvements welcome!
      data as ConstructorParameters<typeof StudentVisitor>[0] &
        ConstructorParameters<typeof IntaniaVisitor>[0] &
        ConstructorParameters<typeof UniversityVisitor>[0] &
        ConstructorParameters<typeof TeacherVisitor>[0] &
        ConstructorParameters<typeof OtherVisitor>[0],
    );
  }

  static async fetchFromCode(sixDigitCode: string) {
    console.log(sixDigitCode);
    const { data, status, ok } = await Database.fetch(
      "GET",
      // `/visitors/${sixDigitCode}`,
      "/visitors/me",
    );
    if (!ok) return { data: null, status, ok };
    return { data: VisitorFactory.fromData(data), status, ok };
  }

  static async fetchFromCookies(
    cookieStore: Awaited<ReturnType<typeof cookies>>,
  ) {
    const { data, status, ok } = await Database.fetch<{
      email: string;
    }>("GET", "/visitors/me", undefined, {
      headers: { Cookie: cookieStore.toString() },
    });
    if (!ok) return { data: null, status, ok };
    return { data: VisitorFactory.fromData(data), status, ok };
  }
}
