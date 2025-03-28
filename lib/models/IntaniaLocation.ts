import { SEPARATOR } from "@/lib/config";
import { sift } from "radash";

/** A location in Chula Engineering. */
export default class IntaniaLocation {
  #id: string;
  /** The room name, i.e. 420. */
  #room: string | null;
  /** The floor number, i.e. 1, M, etc. */
  #floor: string | null;
  /** The building name, i.e. 2, iCanteen, etc. Omit the word building. */
  #building: string;

  constructor(data: {
    id: string;
    room: string | null;
    floor: string | null;
    building: string;
  }) {
    this.#id = data.id;
    this.#room = data.room;
    this.#floor = data.floor;
    this.#building = data.building;
  }

  /** Formats the location as a string. */
  get formatted() {
    return sift([
      this.#room,
      this.#room && SEPARATOR,
      this.#building[0]?.match(/[\u0E00-\u0E7F]/)
        ? this.#building
        : `ตึก ${this.#building}`,
      this.#floor && `ชั้น ${this.#floor}`,
    ]).join(" ");
  }

  // Standard getters
  get id() {
    return this.#id;
  }
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
