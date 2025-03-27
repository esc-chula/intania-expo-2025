import Button from "@/app/components/Button";
import Icon from "@/app/components/Icon";
import TopAppBar from "@/app/components/TopAppBar";
import BuildingCard from "@/app/map/components/BuildingCard";
import PositioningLayer from "@/app/map/components/PositioningLayer";
import Building from "@/lib/models/Building";
import Overview from "@/public/assets/map/overview.png";
import Image from "next/image";

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
      <div className="relative overflow-hidden">
        <Image src={Overview} alt="แผนที่" quality={100} priority />
        <div className="pointer-events-none absolute inset-0">
          <PositioningLayer />
        </div>
      </div>
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
