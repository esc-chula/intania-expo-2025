import Icon from "@/app/components/Icon";
import type { JSX } from "react";
import React from "react";

export enum MAJOR_CATEGORY {
  Thai = "thai",
  ISE = "ise",
  ChPE = "chpe",
}

/** A major in the faculty. */
export default class Major {
  #code: string;
  #slug: string;
  #fullName: string;
  #displayName: string | null;
  #icon: JSX.Element;
  #category: MAJOR_CATEGORY;

  // prettier-ignore
  static readonly ALL: Major[] = [
    new Major("CE", "ce", "วิศวกรรมโยธา", null , "flyover", MAJOR_CATEGORY.Thai),
    new Major("EE", "ee", "วิศวกรรมไฟฟ้า", null , "bolt", MAJOR_CATEGORY.Thai),
    new Major("ME", "me", "วิศวกรรมเครื่องกล", null , "settings", MAJOR_CATEGORY.Thai),
    new Major("AE", "me#ae", "วิศวกรรมยานยนต์", null , "directions_car", MAJOR_CATEGORY.Thai),
    new Major("IE", "ie", "วิศวกรรมอุตสาหการ", null , "factory", MAJOR_CATEGORY.Thai),
    new Major("ENV", "env", "วิศวกรรมสิ่งแวดล้อมและความยั่งยืน", "วิศวกรรมสิ่งแวดล้อม" , "park", MAJOR_CATEGORY.Thai),
    new Major("MT", "mt", "วิศวกรรมโลหการ", null , "hexagon", MAJOR_CATEGORY.Thai),
    new Major("PE", "pe", "วิศวกรรมเหมืองแร่และปิโตรเลียม", "วิศวกรรมปิโตรเลียม" , "oil_barrel", MAJOR_CATEGORY.Thai),
    new Major("NE", "ne", "วิศวกรรมนิวเคลียร์", null , "sunny", MAJOR_CATEGORY.Thai),
    new Major("SV", "sv", "วิศวกรรมสำรวจ", null , "map", MAJOR_CATEGORY.Thai),
    new Major("ChE", "che", "วิศวกรรมเคมี", null , "science", MAJOR_CATEGORY.Thai),
    new Major("CP", "cp", "วิศวกรรมคอมพิวเตอร์", null , "computer", MAJOR_CATEGORY.Thai),
    new Major("CEDT", "cp#cedt", "วิศวกรรมคอมพิวเตอร์และเทคโนโลยีดิจิทัล (CEDT)", "CEDT", "code", MAJOR_CATEGORY.Thai),
    new Major("robotics", "robotics", "วิศวกรรมหุ่นยนต์และปัญญาประดิษฐ์ (Robotics & AI)", "Robotics & AI", "precision_manufacturing", MAJOR_CATEGORY.ISE),
    new Major("ICE", "ice", "วิศวกรรมสารสนเทศและการสื่อสาร (ICE)", "ICE", "code", MAJOR_CATEGORY.ISE),
    new Major("NANO", "nano", "วิศวกรรมนาโน (NANO)", "NANO", "blur_on", MAJOR_CATEGORY.ISE),
    new Major("ADME", "adme", "วิศวกรรมการออกแบบและการผลิตยานยนต์ (ADME)", "ADME-V", "directions_car", MAJOR_CATEGORY.ISE),
    new Major("AERO", "aero", "วิศวกรรมอากาศยาน (AERO)", "AERO", "travel", MAJOR_CATEGORY.ISE),
    new Major("SEMI", "semi", "วิศวกรรมเซมิคอนดักเตอร์ (SEMI)", "SEMI", "memory", MAJOR_CATEGORY.ISE),
    new Major("ChPE", "chpe", "Chemical and Process Engineering (ChPE)", "ChPE", "cycle", MAJOR_CATEGORY.ChPE),
  ];

  static fromSlug(slug: string) {
    return Major.ALL.find((major) => major.slug === slug);
  }

  constructor(
    code: string,
    slug: string,
    fullName: string,
    displayName: string | null,
    iconName: string,
    category: MAJOR_CATEGORY,
  ) {
    this.#code = code;
    this.#slug = slug;
    this.#displayName = displayName;
    this.#fullName = fullName;
    this.#icon = React.createElement(Icon, { name: iconName });
    this.#category = category;
  }
  get displayName() {
    return this.#displayName || this.#fullName;
  }

  get url() {
    return `/majors/${this.#slug}`;
  }

  // Standard getters
  get code() {
    return this.#code;
  }
  get slug() {
    return this.#slug;
  }
  get fullName() {
    return this.#fullName;
  }
  get icon() {
    return this.#icon;
  }
  get category() {
    return this.#category;
  }
}
