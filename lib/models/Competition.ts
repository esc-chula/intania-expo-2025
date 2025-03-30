import Button from "@/app/components/Button";
import type { ComponentProps } from "react";

type CompetitionLink = {
  name: string;
  url: string;
  appearance: ComponentProps<typeof Button>["appearance"];
};

export default class Competition {
  #title: string;
  #description: string;
  #image: string;
  #links: CompetitionLink[];

  static readonly ALL: Competition[] = [
    new Competition(
      "Intania Hackathon",
      "เตรียมตัวพบกับ Intania Hackathon By Garena ชิงเงินรางวัลมูลค่า 250,000 บาท — งานที่จะสร้างบรรยากาศที่ทำให้ทุกคนได้สร้างสิ่งใหม่ ๆ แก้ไขปัญหาใหม่ ๆ ที่สร้าง Imapct ได้จริงไปด้วยกันในเวลา 48 ชั่วโมง",
      "/arena/ih.png",
      [{ name: "ชมเว็บไซต์", url: "https://intania.tech/hackathon", appearance: "filled" }],
    ),
    new Competition(
      "Integration Bee Challenge",
      "การแข่งขันอินทิเกรตสุดเดือดในระดับมัธยมศึกษาตอนปลาย เปิดเนื้อหาต้อนรับเข้าสู่โลกแห่งวิศวะ สามารถเข้าชมงานการแข่งขันรอบชิงชนะเลิศได้ที่หน้าเวที ณ หอประชุมอาคาร 4 ชั้น 2",
      "/arena/ib.png",
      [
        { name: "ชมถ่ายทอดสด", url: "https://www.facebook.com/profile.php?id=61574441578556&sk=live_videos", appearance: "filled" },
        { name: "สมัคร", url: "https://docs.google.com/forms/d/e/1FAIpQLScxBISyeaFQY1Cc4j0MuDg3S_ZcHoiKCv4Soecl_h_4N8zpkQ/viewform?usp=dialog", appearance: "outlined" },
      ],
    ),
    new Competition(
      "Intania Innovation Contest",
      "การแข่งขันโครงงานนวัตกรรมที่เฟ้นหาสุดยอดไอเดียจากนักเรียนมัธยมปลายในรอบ Final & Grand Final มีลุ้นรับรางวัลสุดพิเศษสำหรับผู้เข้าร่วมงานอีกด้วย",
      "/arena/iic.png",
      [{ name: "อ่านต่อ", url: "https://www.instagram.com/intaniainnovationcontest2025/", appearance: "outlined" }],
    ),
    new Competition(
      "Intania Metaverse Exhibition",
      "พบกับการแข่งขันรอบสุดท้ายของสุดยอดโครงการที่ผสมผสานเทคโนโลยี Metaverse และนิทรรศการสุดล้ำ!",
      "/arena/ime.png",
      [{ name: "อ่านต่อ", url: "https://www.instagram.com/intaniaverse/", appearance: "outlined" }],
    ),
  ];

  constructor(
    title: string,
    description: string,
    image: string,
    links: CompetitionLink[],
  ) {
    this.#title = title;
    this.#description = description;
    this.#image = image;
    this.#links = links;
  }

  // Standard getters
  get title() {
    return this.#title;
  }
  get description() {
    return this.#description;
  }
  get image() {
    return this.#image;
  }
  get links() {
    return this.#links;
  }
}
