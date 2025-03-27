import { UUID } from "crypto";

export type IntaniaLocation = {
  id: UUID;
  room?: string;
  floor?: string; // (i.e. ‘1’, ‘M’)
  building: string;
};
