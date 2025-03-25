/*

{
  "id": "4f819a07-6674-42fb-b21b-7b4aea213e6a",
  "name": "workshop1",
  "intaniaLocationId": "5ea37470-bb01-43d3-bbeb-9059d1495cc2",
  "intaniaLocation": {
    "id": "5ea37470-bb01-43d3-bbeb-9059d1495cc2",
    "room": "101",
    "floor": "1",
    "building": "ENG3"
  },
  "workshopSlots": [
    {
      "id": "db0c9f6e-4d1d-4cf8-b71b-c4669e23d24c",
      "startTime": "1900-04-29T23:17:56.000Z",
      "endTime": "1910-04-30T01:17:56.000Z",
      "currentRegistrantCount": 0,
      "maxRegistrantCount": 50,
      "workshopId": "4f819a07-6674-42fb-b21b-7b4aea213e6a"
    },
    {
      "id": "e0ef3a51-d7d5-421d-afff-25743ea84afc",
      "startTime": "2025-04-29T23:00:00.000Z",
      "endTime": "2025-04-30T01:00:00.000Z",
      "currentRegistrantCount": 0,
      "maxRegistrantCount": 50,
      "workshopId": "4f819a07-6674-42fb-b21b-7b4aea213e6a"
    },
    {
      "id": "dca6926c-76b1-4902-9a5e-8fcf5e23923f",
      "startTime": "2025-04-30T05:00:00.000Z",
      "endTime": "2025-04-30T07:00:00.000Z",
      "currentRegistrantCount": 0,
      "maxRegistrantCount": 50,
      "workshopId": "4f819a07-6674-42fb-b21b-7b4aea213e6a"
    }
  ]
}
*/

import Database from "@/lib/models/Database";
import IntaniaLocation from "@/lib/models/IntaniaLocation";
import WorkshopSlot from "@/lib/models/WorkshopSlot";
import { sort } from "radash";

export default class Workshop {
  #id: string;
  #name: string;
  #intaniaLocation: IntaniaLocation;
  #workshopSlots: WorkshopSlot[];

  static async fetchAllPlain() {
    return await Database.fetch<ConstructorParameters<typeof Workshop>[0][]>(
      "GET",
      "/workshops",
    );
  }
  static async fetchAll() {
    const { data, status, ok } = await Workshop.fetchAllPlain();
    if (!ok) return { data: null, status, ok };
    return { data: data.map((workshop) => new Workshop(workshop)), status, ok };
  }

  constructor(data: {
    id: string;
    name: string;
    intaniaLocation: ConstructorParameters<typeof IntaniaLocation>[0];
    workshopSlots: ConstructorParameters<typeof WorkshopSlot>[0][];
  }) {
    this.#id = data.id;
    this.#name = data.name;
    this.#intaniaLocation = new IntaniaLocation(data.intaniaLocation);
    this.#workshopSlots = data.workshopSlots.map(
      (slot) => new WorkshopSlot(slot),
    );
  }

  get upcomingSlots() {
    return sort(
      this.#workshopSlots.filter((slot) => !slot.hasStarted),
      (slot) => slot.startTime.getTime(),
    ).slice(0, 3);
  }

  getSlotsByTime(date: Date, passed = false) {
    return sort(
      this.#workshopSlots.filter(
        (slot) => slot.hasStarted === passed && slot.isSameDate(date),
      ),
      (slot) => slot.startTime.getTime(),
    );
  }

  // Standard getters
  get id() {
    return this.#id;
  }
  get name() {
    return this.#name;
  }
  get intaniaLocation() {
    return this.#intaniaLocation;
  }
  get workshopSlots() {
    return this.#workshopSlots;
  }
}
