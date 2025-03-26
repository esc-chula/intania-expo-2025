export default class Room {
  #id: string;
  #name: string;
  #event: string;
  #body: string;

  constructor(data: { id: string; name: string; event: string; body: string }) {
    this.#id = data.id;
    this.#name = data.name;
    this.#event = data.event;
    this.#body = data.body;
  }

  // Standard getters
  get id() {
    return this.#id;
  }
  get name() {
    return this.#name;
  }
  get event() {
    return this.#event;
  }
  get body() {
    return this.#body;
  }
}
