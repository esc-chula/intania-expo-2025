import { Prisma, Room as PrismaRoom } from "@prisma/client";
import { UUID } from "crypto";

export type BuildingList = Prisma.BuildingGetPayload<{
  include: { floors: true };
}>;

export type BuildingDetail = Prisma.BuildingGetPayload<{
  include: { floors: { include: { rooms: true } } };
}>;

export type FloorDetail = Prisma.FloorGetPayload<{
  include: { rooms: true };
}>;

export type RoomDetail = PrismaRoom;

export type Building = {
  id: UUID;
  name: string;
  slug?: string;
  images: string[];
};

export type Floor = {
  id: UUID;
  buildingId: UUID;
  name: string;
  summary?: string;
  slug?: string;
};

export type Room = {
  id: UUID;
  floorId: UUID;
  name: string;
  event?: string;
  body?: string; //! Markdown
};
