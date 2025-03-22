import { z } from "zod";

export const DataSchema = {};
export const SortingSchema = z
  .object({
    columns: z.array(z.string().min(1, "Cannot be empty")),
    ascending: z.boolean().default(true),
  })
  .nullable()
  .optional();
export const GroupingSchema = {};
export const FetchLevelSchema = {};

const EventDataSchema = z
  .object({
    search: z.string().optional(),
    tags: z.string().optional(),
  })
  .strict();

const WorkshopDataSchema = EventDataSchema;

export const EventQuerySchema = z.object({
  data: EventDataSchema.nullable().optional(),
  grouping: z.enum(["startTime", "tags"]).array().nullable().optional(),
});

export const WorkshopQuerySchema = z.object({
  data: WorkshopDataSchema.nullable().optional(),
});
