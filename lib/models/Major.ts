import Icon from "@/app/components/Icon";
import type { JSX } from "react";
import React from "react";

export enum MAJOR_LANGUAGE {
  En = "en",
  Th = "th",
  ChPE = "chpe",
}

/** A major in the faculty. */
export default class Major {
  #slug: string;
  #fullName: string;
  #displayName: string | null;
  #icon: JSX.Element;
  #language: MAJOR_LANGUAGE;

  // prettier-ignore
  static readonly ALL: Major[] = [
    new Major("CE", "วิศวกรรมโยธา", null , "flyover", MAJOR_LANGUAGE.Th),
    new Major("EE", "วิศวกรรมไฟฟ้า", null , "bolt", MAJOR_LANGUAGE.Th),
    new Major("ME", "วิศวกรรมเครื่องกล", null , "settings", MAJOR_LANGUAGE.Th),
    new Major("AE", "วิศวกรรมยานยนต์", null , "directions_car", MAJOR_LANGUAGE.Th),
    new Major("IE", "วิศวกรรมอุตสาหการ", null , "factory", MAJOR_LANGUAGE.Th),
    new Major("ENV", "วิศวกรรมสิ่งแวดล้อมและความยั่งยืน", "วิศวกรรมสิ่งแวดล้อม" , "park", MAJOR_LANGUAGE.Th),
    new Major("MT", "วิศวกรรมโลหการ", null , "hexagon", MAJOR_LANGUAGE.Th),
    new Major("PE", "วิศวกรรมเหมืองแร่และปิโตรเลียม", "วิศวกรรมปิโตรเลียม" , "oil_barrel", MAJOR_LANGUAGE.Th),
    new Major("NE", "วิศวกรรมนิวเคลียร์", null , "sunny", MAJOR_LANGUAGE.Th),
    new Major("SV", "วิศวกรรมสำรวจ", null , "map", MAJOR_LANGUAGE.Th),
    new Major("ChE", "วิศวกรรมเคมี", null , "science", MAJOR_LANGUAGE.Th),
    new Major("CP", "วิศวกรรมคอมพิวเตอร์", null , "computer", MAJOR_LANGUAGE.Th),
    new Major("CEDT", "วิศวกรรมคอมพิวเตอร์และเทคโนโลยีดิจิทัล (CEDT)", "CEDT", "code", MAJOR_LANGUAGE.Th),
    new Major("robotics", "วิศวกรรมหุ่นยนต์และปัญญาประดิษฐ์ (Robotics & AI)", "Robotics & AI", "precision_manufacturing", MAJOR_LANGUAGE.En),
    new Major("ICE", "วิศวกรรมสารสนเทศและการสื่อสาร (ICE)", "ICE", "code", MAJOR_LANGUAGE.En),
    new Major("NANO", "วิศวกรรมนาโน (NANO)", "NANO", "blur_on", MAJOR_LANGUAGE.En),
    new Major("ADME", "วิศวกรรมการออกแบบและการผลิตยานยนต์ (ADME)", "ADME-V", "directions_car", MAJOR_LANGUAGE.En),
    new Major("AERO", "วิศวกรรมอากาศยาน (AERO)", "AERO", "travel", MAJOR_LANGUAGE.En),
    new Major("SEMI", "วิศวกรรมเซมิคอนดักเตอร์ (SEMI)", "SEMI", "memory", MAJOR_LANGUAGE.En),
    new Major("ChPE", "Chemical and Process Engineering (ChPE)", "ChPE", "cycle", MAJOR_LANGUAGE.ChPE),
  ];

  static fromSlug(slug: string) {
    return Major.ALL.find((major) => major.slug === slug);
  }

  constructor(
    slug: string,
    fullName: string,
    displayName: string | null,
    iconName: string,
    language: MAJOR_LANGUAGE,
  ) {
    this.#slug = slug;
    this.#displayName = displayName;
    this.#fullName = fullName;
    this.#icon = React.createElement(Icon, { name: iconName });
    this.#language = language;
  }
  get displayName() {
    return this.#displayName || this.#fullName;
  }

  // Standard getters
  get slug() {
    return this.#slug;
  }
  get fullName() {
    return this.#fullName;
  }
  get icon() {
    return this.#icon;
  }
  get language() {
    return this.#language;
  }
}
