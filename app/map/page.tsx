import Button from "@/app/components/Button";
import Icon from "@/app/components/Icon";
import TopAppBar from "@/app/components/TopAppBar";
import BuildingCard from "@/app/map/components/BuildingCard";
import PositionedMap from "@/app/map/components/PositionedMap";
import Building from "@/lib/models/Building";
import Overview from "@/public/assets/map/overview.png";
import { Metadata } from "next";
import PositionMarker from "./components/PositionMarker";

export const metadata: Metadata = {
  title: "Explore the map",
  description: "คณะวิศวฯ มีตึกอะไรบ้าง น่าตาเป็นยังไง มีโซนอะไรบ้าง มาดูกันเลย",
};

export default async function ExploreTheMap() {
  const { data: buildings } = await Building.fetchAll();

  return (
    <div className="space-y-6 pt-16 pb-4">
      <TopAppBar>
        <Button appearance="text" href="/">
          <Icon name="arrow_back" />
        </Button>
        <h1>Explore the map</h1>
      </TopAppBar>
      <PositionedMap src={Overview}>
        <ul
          role="list"
          aria-label="คำอธิบาย"
          className="flex gap-3 *:flex *:items-center *:gap-2"
        >
          <li className="grow">
            <div className="h-5 w-4">
              <PositionMarker suppressAnimation className="relative top-1" />
            </div>
            คุณอยู่ที่นี่
          </li>
          <li>
            <Icon
              name="confirmation_number"
              size={20}
              className="bg-yellow text-black"
            />
            จุดลงทะเบียน
          </li>
          <li>
            <Icon name="wc" size={20} className="bg-bright-red text-white" />
            ห้องน้ำ
          </li>
        </ul>
      </PositionedMap>
      <ul role="list" className="space-y-4">
        {buildings.map((building) => (
          <li key={building.id}>
            <BuildingCard building={building} />
          </li>
        ))}
      </ul>
    </div>
  );
}
