import { SEPARATOR } from "@/lib/config";

/** A location in Chula Engineering. */
export default class IntaniaLocation {
  /** The room name, i.e. Hall of Intania. */
  #room: string | null;
  /** The floor number, i.e. 1, M, etc. */
  #floor: string;
  /** The building name, i.e. 2, iCanteen, etc. Omit the word building. */
  #building: string;

  constructor(room: string, floor: string, building: string) {
    this.#room = room;
    this.#floor = floor;
    this.#building = building;
  }

  /** Formats the location as a string. */
  get string() {
    return [
      ...(this.#room ? [SEPARATOR] : []),
      `ตึก ${this.#building}`,
      `ชั้น ${this.#floor}`,
    ].join(" ");
  }

  // Standard getters
  get room() {
    return this.#room;
  }
  get floor() {
    return this.#floor;
  }
  get building() {
    return this.#building;
  }
}
