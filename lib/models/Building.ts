import Database from "@/lib/models/Database";
import Floor from "@/lib/models/Floor";
import { dash } from "radash";

export default class Building {
  #id: string;
  #name: string;
  #slug: string;
  #images: string[];
  #floors: Floor[];

  static async fetchAll() {
    const { data, status, ok } = await Database.fetch<
      ConstructorParameters<typeof Building>[0][]
    >("GET", "/buildings");
    if (!ok) return { data: [], status, ok };
    return { data: data.map((building) => new Building(building)), status, ok };
  }

  constructor(data: {
    id: string;
    name: string;
    slug: string | null;
    images: string[];
    floors: ConstructorParameters<typeof Floor>[0][];
  }) {
    this.#id = data.id;
    this.#name = data.name;
    this.#slug = data.slug || dash(this.#name);
    this.#images = data.images;
    this.#floors = data.floors.map(
      (floor) => new Floor({ ...floor, rooms: [] }),
    );
  }

  // Standard getters
  get id() {
    return this.#id;
  }
  get name() {
    return this.#name;
  }
  get slug() {
    return this.#slug;
  }
  get images() {
    return this.#images;
  }
  get floors() {
    return this.#floors;
  }
}
