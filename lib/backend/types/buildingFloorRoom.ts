import { UUID } from "crypto";

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
  slug?: string;
};

export type Room = {
  id: UUID;
  floorId: UUID;
  name: string;
  event?: string;
  body?: string; //! Markdown
};
