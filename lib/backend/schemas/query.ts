import { z } from "zod";

export const DataSchema = {};
export const SortingSchema = z.object({
  columns: z.array(z.string().min(1, "Cannot be empty")),
  ascending: z.boolean(),
});
export const GroupingSchema = {};
export const FetchLevelSchema = {};
