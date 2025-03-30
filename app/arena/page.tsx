import CompetitionCard from "@/app/arena/components/CompetitionCard";
import Button from "@/app/components/Button";
import Icon from "@/app/components/Icon";
import TopAppBar from "@/app/components/TopAppBar";
import Competition from "@/lib/models/Competition";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Intania Arena",
  description:
    "เตรียมพบกับสุดยอดการแข่งขันสุดเข้มข้นจากหลากหลายสาขาที่จะปลุกพลังแห่งนวัตกรรมและความสามารถของเหล่านักคิด นักสร้าง และนักแก้ปัญหา!",
};

export default function Arena() {
  return (
    <div className="space-y-4 pt-18 pb-4">
      <TopAppBar>
        <Button appearance="text">
          <Icon name="arrow_back" />
        </Button>
        <h1>Intania Arena</h1>
      </TopAppBar>
      {Competition.ALL.map((competition, index) => (
        <CompetitionCard
          key={index}
          competition={competition}
          imagePriority={index < 2}
        />
      ))}
    </div>
  );
}
