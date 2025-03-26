import { UUID } from "crypto";
import { Prisma, IntaniaLocation } from "@prisma/client";

export type EventDetail = Prisma.EventGetPayload<{
  include: { tags: true, intaniaLocation: true };
}>;

export type Event = {
  id: UUID;
  name: string;
  body?: string; //! Markdown
  startTime?: Date;
  endTime?: Date;
  tagsId: UUID[];
  picture?: string;

  intaniaLocation?: IntaniaLocation;
  intaniaLocationId?: string;
};

export type EventTag = {
  id: UUID;
  name: string;

  events?: Event[];
};
