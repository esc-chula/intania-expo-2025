import Room from "@/lib/models/Room";
import { dash } from "radash";

export default class Floor {
  #id: string;
  #name: string;
  #summary: string;
  #slug: string | null;
  #rooms: Room[];

  constructor(data: {
    id: string;
    name: string;
    slug: string | null;
    rooms: Room[];
  }) {
    this.#id = data.id;
    this.#name = data.name;
    this.#summary = data.name; // Temporary
    this.#slug = data.slug || dash(this.#name);
    this.#rooms = data.rooms;
  }

  urlFrom(buildingSlug: string) {
    return ["/map", buildingSlug, this.#slug].join("/");
  }

  // Standard getters
  get id() {
    return this.#id;
  }
  get name() {
    return this.#name;
  }
  get summary() {
    return this.#summary
  }
  get slug() {
    return this.#slug;
  }
  get rooms() {
    return this.#rooms;
  }
}
