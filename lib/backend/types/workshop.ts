import { IntaniaLocation } from "@prisma/client";
import { UUID } from "crypto";

export type Workshop = {
  id: UUID;
  name: string;
  slots: WorkshopSlot[];

  intaniaLocation?: IntaniaLocation;
  intaniaLocationId?: string;
};

export type WorkshopSlot = {
  id: UUID;
  workshopId: UUID;
  startTime: Date;
  endTime: Date;
  currentRegistrantCount: number;
  maxRegistrantCount?: number;
};

export type WorkshopSlotResponse = {
  id: UUID;
  workshopId: UUID;
  startTime: Date;
  endTime: Date;
  currentRegistrantCount: number;
  maxRegistrantCount?: number;
  visitorStatus?: "registered" | "checkedIn";
};
