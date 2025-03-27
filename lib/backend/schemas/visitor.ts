import validator from "validator";
import { z } from "zod";

export const CreateVisitorSchema = z.object({
  name: z.string().min(1, "Cannot be empty"),
  surname: z.string().min(1, "Cannot be empty"),
  gender: z.string().min(1, "Cannot be empty"),
  phone: z.string().refine(validator.isMobilePhone),
  email: z.string().email(),
  category: z.enum([
    "STUDENT",
    "INTANIA",
    "COLLEGE_STUDENT",
    "TEACHER",
    "OTHER",
  ]),
  visitDates: z.array(z.string()).default([]),
  interestedActivities: z.array(z.string()).default([]),
  referralSources: z.array(z.string()).default([]),
  studentLevel: z.string().optional(),
  studyStream: z.string().optional(),
  school: z.string().optional(),
  province: z.string().optional(),
  interestLevel: z.string().optional(),
  interestedFields: z.array(z.string()).default([]),
  emergencyContact: z.string().optional(),
  universityYear: z.string().optional(),
  faculty: z.string().optional(),
  university: z.string().optional(),
  alumniBatch: z.string().optional(),
  teacherSchool: z.string().optional(),
  teacherProvince: z.string().optional(),
  subjectTaught: z.string().optional(),
});
