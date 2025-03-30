import Database from "@/lib/models/Database";
import Room from "@/lib/models/Room";
import { dash } from "radash";

export default class Floor {
  #id: string;
  #name: string;
  #summary: string;
  #slug: string | null;
  #rooms: Room[];

  static async fetchFromSlug(buildingSlug: string, floorSlug: string) {
    const { data, status, ok } = await Database.fetch<
      ConstructorParameters<typeof Floor>[0]
    >("GET", `/floors/${buildingSlug}/${floorSlug}`);
    return { data: ok ? new Floor(data) : null, status, ok };
  }

  constructor(data: {
    id: string;
    name: string;
    summary: string;
    slug: string | null;
    rooms: Room[];
  }) {
    this.#id = data.id;
    this.#name = data.name;
    this.#summary = data.summary;
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
    return this.#summary;
  }
  get slug() {
    return this.#slug;
  }
  get rooms() {
    return this.#rooms;
  }
}
