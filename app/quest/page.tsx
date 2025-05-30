import Button from "@/app/components/Button";
import Icon from "@/app/components/Icon";
import TopAppBar from "@/app/components/TopAppBar";
import WorkshopCard from "@/app/quest/components/WorkshopCard";
import Workshop from "@/lib/models/Workshop";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Intania Quest",
  description: "เจาะลึกภาควิชาแบบจัดเต็มผ่านเวิร์กชอปสุดเข้มข้น!",
};

export const revalidate = 3600;

export default async function Workshops() {
  const { data: workshops } = await Workshop.fetchAllPlain();

  return (
    <div className="space-y-9 pt-16 pb-4">
      <TopAppBar>
        <Button appearance="text" href="/">
          <Icon name="arrow_back" />
        </Button>
        <h1>Intania Quest</h1>
      </TopAppBar>
      <section className="space-y-2">
        <p className="text-body-lg leading-body-lg">
          <strong className="text-yellow">
            เนื่องจากเหตุการณ์แผ่นดินไหว ทางทีมงาน Intania Expo
            จำเป็นต้องยกเลิกกิจกรรม Workshop ทั้งหมด
          </strong>
        </p>
        <div className="flex justify-end gap-2 pt-2">
          <Button
            appearance="outlined"
            href="https://www.instagram.com/cuintaniaopenhouse"
          >
            ดูรายละเอียด
          </Button>
          <Button
            appearance="filled"
            disabled
            href="https://forms.gle/hMsHmPmF8XyeQnFS9"
          >
            สมัคร
          </Button>
        </div>
      </section>
      <section aria-labelledby="explore" className="space-y-4">
        <h2
          id="explore"
          className="text-headline-sm leading-headline-sm font-bold"
        >
          Explore workshops
        </h2>
        <ul className="space-y-4">
          {workshops?.map((workshop) => (
            <WorkshopCard key={workshop.id} workshop={workshop} />
          ))}
        </ul>
      </section>
    </div>
  );
}
