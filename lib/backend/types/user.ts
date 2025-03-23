import { UUID } from "crypto";

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
