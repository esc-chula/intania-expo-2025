import { z } from "zod";

export const JoinWorkshopSchema = z.object({
  userId: z.string().min(1, "Cannot be empty"),
  workshopSlotId: z.string().min(1, "Cannot be empty"),
});

export const CancelWorkshopSchema = JoinWorkshopSchema;
