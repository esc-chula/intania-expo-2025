import validator from "validator";
import { z } from "zod";

export const CreateVisitorSchema = z.object({
  name: z.string().min(1, "Cannot be empty"),
  surname: z.string().min(1, "Cannot be empty"),
  gender: z.string().min(1, "Cannot be empty"),
  phone: z.string().refine(validator.isMobilePhone),
  email: z.string().email(),
  category: z.string().min(1, "Cannot be empty"),
  visitDate: z.string().min(1, "Cannot be empty"),
  interestedActivities: z.string(),
  referralSource: z.string(),
  studentLevel: z.string(),
  studyStream: z.string(),
  school: z.string(),
  province: z.string(),
  interestLevel: z.string(),
  interestedField: z.string(),
  emergencyContact: z.string(),
  universityYear: z.string(),
  faculty: z.string(),
  university: z.string(),
  alumniBatch: z.string(),
  teacherSchool: z.string(),
  teacherProvince: z.string(),
  subjectTaught: z.string(),
});
