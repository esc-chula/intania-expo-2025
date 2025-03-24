import { UUID } from "crypto";
import { Prisma } from "@prisma/client";

export type VisitorDetails = Prisma.UserGetPayload<
  {
    select: {
      id: true,
      email: true,
      role: true,
      sixDigitCode: true,
      incrementCode: true,
      name: true,
      surname: true,
      gender: true,
      phone: true,
      category: true,
      visitDates: true,
      interestedActivities: true,
      referralSources: true,
      studentLevel: true,
      studyStream: true,
      school: true,
      province: true,
      interestLevel: true,
      interestedFields: true,
      emergencyContact: true,
      universityYear: true,
      faculty: true,
      university: true,
      alumniBatch: true,
      teacherSchool: true,
      teacherProvince: true,
      subjectTaught: true,
      workshopId: false, // Exclude workshopId
    }
  }
>;

export type User = {
  // ? following the document
  id: UUID;
  email: string;
};

export type ExpoStaff = {
  role: "EXPO_STAFF";
} & User;

export type WorkshopStaff = {
  role: "WORKSHOP_STAFF";
  workshopId: UUID;
} & User;

export type Visitor = {
  sixDigitCode: string;
  name: string;
  surname: string;
  gender: string;
  phone: string;
  category: string;
  visitDates: string[];
  interestedActivities: string[];
  referralSources: string[];
  studentLevel?: string;
  studyStream?: string;
  school?: string;
  province?: string;
  interestLevel?: string;
  interestedFields: string[];
  emergencyContact?: string;
  universityYear?: string;
  faculty?: string;
  university?: string;
  alumniBatch?: string;
  teacherSchool?: string;
  teacherProvince?: string;
  subjectTaught?: string;
  role: "VISITOR";
} & User;
