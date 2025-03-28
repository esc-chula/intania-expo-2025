import Button from "@/app/components/Button";
import Icon from "@/app/components/Icon";
import TopAppBar from "@/app/components/TopAppBar";
import RoomCard from "@/app/map/components/RoomCard";
import Floor from "@/lib/models/Floor";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ building: string; floor: string }>;
}) {
  const { building: buildingSlug, floor: floorSlug } = await params;
  const { data: floor } = await Floor.fetchFromSlug(buildingSlug, floorSlug);

  return (
    <div className="space-y-6 pt-16 pb-4">
      <TopAppBar>
        <Button appearance="text" href="/map">
          <Icon name="arrow_back" />
        </Button>
        <h1>{floor?.name}</h1>
      </TopAppBar>
      <Image
        src={`/assets/map/${buildingSlug}/${floorSlug}.png`}
        alt="แผนที่"
        width={730}
        height={496}
        quality={100}
        priority
        className="bg-brown text-brown"
      />
      <ul role="list" className="space-y-3">
        {floor?.rooms.map((room) => (
          <li key={room.id}>
            <RoomCard room={room} />
          </li>
        ))}
      </ul>
    </div>
  );
}
