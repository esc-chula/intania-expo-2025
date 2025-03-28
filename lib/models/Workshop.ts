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
