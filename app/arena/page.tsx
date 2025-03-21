import EventCard from "../components/Arena/EventCard";
import Button from "../components/Button";
import Icon from "../components/Icon";
import TopAppBar from "../components/TopAppBar";

export default function Events() {
  const eventData = [
    {
      title: "Intania Hackathon",
      description:
        "เตรียมตัวพบกับ Intania Hackathon By Garena ชิงเงินรางวัลมูลค่า 250,000 บาท - งานที่จะสร้างบรรยากาศที่ทำให้ทุกคนได้สร้างสิ่งใหม่ ๆ แก้ไขปัญหาใหม่ ๆ ที่สร้าง Imapct ได้จริงไปด้วยกันในเวลา 48 ชั่วโมง",
      image: "/arena/ih.png",
      links: [{ name: "ชมเว็บไซต์", url: "https://intania.tech/hackathon" }],
    },
    {
      title: "Integration Bee Challenge",
      description:
        "เตรียมตัวพบกับ Intania Hackathon​ - งานที่จะสร้าง บรรยากาศที่ทำให้ทุกคนได้สร้างสิ่งใหม่ ๆ แก้ไขปัญหาใหม่ ๆ ที่สร้าง Impact ได้จริงไปด้วยกัน",
      image: "/arena/ib.png",
      links: [
        { name: "สมัคร", url: "/" },
        { name: "อ่านต่อ", url: "/" },
      ],
    },
    {
      title: "Intania Innovation Contest",
      description:
        "การแข่งขันนวัตกรรมนักเรียนระดับม้ธยมศึกษาตอนปลาย ในด้านวิศวกรรมศาสตร์ประจำปี 2568 ในธีม “Innovation towards Global Impact”",
      image: "/arena/iic.png",
      links: [{ name: "อ่านต่อ", url: "/" }],
    },
    {
      title: "Intania Metaverse Exhibition",
      description:
        "Pitching รอบไฟนอลของ Thailand Metaverse Hackathon and Exhibition ครั้งที่ 1 และงานจัดแสดง Metaverse โดยบริษัทและหน่วยงานต่าง ๆ",
      image: "/arena/ime.png",
      links: [{ name: "อ่านต่อ", url: "/" }],
    },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mt-32">
        <TopAppBar>
          <Button appearance="text">
            <Icon name="arrow_back" />
          </Button>
          <h1 className="text-2xl font-bold">Intania Arena</h1>
        </TopAppBar>
        {eventData.map((event, index) => (
          <EventCard
            key={index}
            title={event.title}
            description={event.description}
            image={event.image}
            links={event.links}
          />
        ))}
      </div>
    </div>
  );
}
