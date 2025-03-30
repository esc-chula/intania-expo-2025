import { LOCALE } from "@/lib/config";

export default class WorkshopSlot {
  #id: string;
  #startTime: Date;
  #endTime: Date;
  #currentRegistrantCount: number;
  #maxRegistrantCount: number;

  constructor(data: {
    id: string;
    startTime: string;
    endTime: string;
    currentRegistrantCount: number;
    maxRegistrantCount: number;
  }) {
    this.#id = data.id;
    this.#startTime = new Date(data.startTime);
    this.#endTime = new Date(data.endTime);
    this.#currentRegistrantCount = data.currentRegistrantCount;
    this.#maxRegistrantCount = data.maxRegistrantCount;
  }

  private static formatTime(date: Date) {
    return date.toLocaleTimeString(LOCALE, {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  get formattedStartTime() {
    return WorkshopSlot.formatTime(this.#startTime);
  }
  get formattedEndTime() {
    return WorkshopSlot.formatTime(this.#endTime);
  }
  get formattedTime() {
    return [
      WorkshopSlot.formatTime(this.#startTime),
      WorkshopSlot.formatTime(this.#endTime),
    ].join("–");
  }

  get hasStarted() {
    return this.#startTime < new Date();
  }

  isSameDate(date: Date) {
    return (
      this.#startTime.getDate() === date.getDate() &&
      this.#startTime.getMonth() === date.getMonth() &&
      this.#startTime.getFullYear() === date.getFullYear()
    );
  }

  get percentage() {
    return (this.#currentRegistrantCount / this.#maxRegistrantCount) * 100;
  }
  get isFull() {
    return this.#currentRegistrantCount >= this.#maxRegistrantCount;
  }

  // Standard getters
  get id() {
    return this.#id;
  }
  get startTime() {
    return this.#startTime;
  }
  get endTime() {
    return this.#endTime;
  }
  get currentRegistrantCount() {
    return this.#currentRegistrantCount;
  }
  get maxRegistrantCount() {
    return this.#maxRegistrantCount;
  }
}
