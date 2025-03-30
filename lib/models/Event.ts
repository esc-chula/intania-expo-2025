import { EVENT_START_DATE, LOCALE, SEPARATOR } from "@/lib/config";
import Database from "@/lib/models/Database";
import IntaniaLocation from "@/lib/models/IntaniaLocation";

export enum EVENT_GROUP {
  /** The Event has started and has not ended. */
  Now,
  /** The Event is part of the Intania Expo. */
  Expo,
  /** The Event is delayed until after the Intania Expo. */
  Later,
}

const DEFAULT_EVENT_DURATION = 1000 * 60 * 60 * 3; // 3 hours
const EXPO_DURATION = 1000 * 60 * 60 * 7; // 7 hours

export default class Event {
  #id: string;
  #name: string;
  #body: string | null;
  #startTime: Date | null;
  #endTime: Date | null;
  #location: IntaniaLocation | null;
  #tags: string[];
  #picture: string | null;

  static async fetchAll() {
    const { data, status, ok } = await Database.fetch<
      ConstructorParameters<typeof Event>[0][]
    >("GET", "/events");
    if (!ok) return { data: null, status, ok };
    return { data: data.map((event) => new Event(event)), status, ok };
  }

  static groupByDate(events: Event[]) {
    const groupedEvents: Record<EVENT_GROUP, Event[]> = [[], [], []];
    for (const event of events) {
      if (event.isOngoing) groupedEvents[EVENT_GROUP.Now].push(event);
      else if (event.isIntaniaExpo) groupedEvents[EVENT_GROUP.Expo].push(event);
      else groupedEvents[EVENT_GROUP.Later].push(event);
    }
    return groupedEvents;
  }

  constructor(data: {
    id: string;
    name: string;
    body: string | null;
    startTime: string | null;
    endTime: string | null;
    intaniaLocation: ConstructorParameters<typeof IntaniaLocation>[0] | null;
    tags: string[];
    picture: string | null;
  }) {
    this.#id = data.id;
    this.#name = data.name;
    this.#body = data.body;
    this.#startTime = data.startTime ? new Date(data.startTime) : null;
    this.#endTime = data.endTime ? new Date(data.endTime) : null;
    this.#location = data.intaniaLocation
      ? new IntaniaLocation(data.intaniaLocation)
      : null;
    this.#tags = data.tags;
    this.#picture = data.picture;
  }

  get isOngoing() {
    const now = new Date("2025-03-30T06:30:00.000+07:00");
    return (
      this.startTime !== null &&
      this.startTime <= now &&
      (this.endTime === null
        ? this.isIntaniaExpo
          ? EVENT_START_DATE.getTime() + EXPO_DURATION > now.getTime()
          : this.startTime.getTime() + DEFAULT_EVENT_DURATION > now.getTime()
        : this.endTime.getTime() > now.getTime())
    );
  }
  get isIntaniaExpo() {
    return (
      this.startTime !== null &&
      this.startTime.getTime() <
        EVENT_START_DATE.getTime() + 1000 * 60 * 60 * 24
    );
  }

  private static formatTime(date: Date, short: boolean = false) {
    const formattedDate = date.toLocaleDateString(LOCALE, {
      dateStyle: "medium",
    });
    const formattedTime = date.toLocaleTimeString(LOCALE, {
      hour: "2-digit",
      minute: "2-digit",
    });
    return short
      ? formattedTime
      : [formattedDate, formattedTime].join(` ${SEPARATOR} `);
  }
  get formattedStartTime() {
    return this.#startTime
      ? Event.formatTime(this.#startTime, this.isIntaniaExpo)
      : null;
  }
  get formattedEndTime() {
    return this.#endTime
      ? Event.formatTime(this.#endTime, this.isIntaniaExpo)
      : null;
  }
  get formattedTime() {
    if (this.#startTime && this.#endTime)
      return [
        Event.formatTime(this.#startTime, this.isIntaniaExpo),
        Event.formatTime(this.#endTime, true),
      ].join("–");
    return this.formattedStartTime || this.formattedEndTime;
  }

  // Standard getters
  get id() {
    return this.#id;
  }
  get name() {
    return this.#name;
  }
  get body() {
    return this.#body;
  }
  get startTime() {
    return this.#startTime;
  }
  get endTime() {
    return this.#endTime;
  }
  get location() {
    return this.#location;
  }
  get tags() {
    return this.#tags;
  }
  get picture() {
    return this.#picture;
  }
}
