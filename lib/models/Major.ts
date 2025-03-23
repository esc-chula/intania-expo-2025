import Icon from "@/app/components/Icon";
import type { JSX } from "react";
import React from "react";

export enum MAJOR_LANGUAGE {
  En = "en",
  Th = "th",
}

/** A major in the faculty. */
export default class Major {
  #slug: string;
  #name: string;
  #icon: JSX.Element;
  #language: MAJOR_LANGUAGE;

  // prettier-ignore
  static all: Major[] = [
    new Major("civil", "วิศวกรรมโยธา", "flyover", MAJOR_LANGUAGE.Th),
    new Major("electrical", "วิศวกรรมไฟฟ้า", "bolt", MAJOR_LANGUAGE.Th),
    new Major("mechanical", "วิศวกรรมเครื่องกล", "settings", MAJOR_LANGUAGE.Th),
    new Major("automotive", "วิศวกรรมยานยนต์", "directions_car", MAJOR_LANGUAGE.Th),
    new Major("industrial", "วิศวกรรมอุตสาหการ", "factory", MAJOR_LANGUAGE.Th),
    new Major("environmental", "วิศวกรรมสิ่งแวดล้อม", "park", MAJOR_LANGUAGE.Th),
    new Major("metallurgical", "วิศวกรรมโลหการ", "hexagon", MAJOR_LANGUAGE.Th),
    new Major("petroleum", "วิศวกรรมปิโตรเลียม", "oil_barrel", MAJOR_LANGUAGE.Th),
    new Major("nuclear", "วิศวกรรมนิวเคลียร์", "sunny", MAJOR_LANGUAGE.Th),
    new Major("survey", "วิศวกรรมสำรวจ", "map", MAJOR_LANGUAGE.Th),
    new Major("chemical", "วิศวกรรมเคมี", "science", MAJOR_LANGUAGE.Th),
    new Major("computer", "วิศวกรรมคอมพิวเตอร์", "computer", MAJOR_LANGUAGE.Th),
    new Major("cedt", "CEDT", "code", MAJOR_LANGUAGE.Th),
    new Major("rai", "Robotics & AI", "precision_manufacturing", MAJOR_LANGUAGE.En),
    new Major("ice", "ICE", "code", MAJOR_LANGUAGE.En),
    new Major("nano", "NANO", "blur_on", MAJOR_LANGUAGE.En),
    new Major("admev", "ADME-V", "directions_car", MAJOR_LANGUAGE.En),
    new Major("aero", "AERO", "travel", MAJOR_LANGUAGE.En),
    new Major("semi", "SEMI", "memory", MAJOR_LANGUAGE.En),
    new Major("chpe", "ChPe", "cycle", MAJOR_LANGUAGE.En),
  ];

  static fromSlug(slug: string) {
    return Major.all.find((major) => major.slug === slug);
  }

  constructor(
    slug: string,
    name: string,
    iconName: string,
    language: MAJOR_LANGUAGE,
  ) {
    this.#slug = slug;
    this.#name = name;
    this.#icon = React.createElement(Icon, { name: iconName });
    this.#language = language;
  }

  // Standard getters
  get slug() {
    return this.#slug;
  }
  get name() {
    return this.#name;
  }
  get icon() {
    return this.#icon;
  }
  get language() {
    return this.#language;
  }
}
