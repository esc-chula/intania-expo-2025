import Card from "@/app/components/Card";
import Icon from "@/app/components/Icon";
import Interactive from "@/app/components/Interactive";
import cn from "@/lib/helpers/cn";
import Building from "@/lib/models/Building";
import { StyleableFC } from "@/lib/types/misc";
import Image from "next/image";

const BuildingCard: StyleableFC<{
  building: Building;
}> = ({ building, className, style }) => {
  return (
    <Card className={cn(`divide-cream divide-y-1`, className)} style={style}>
      <div className="grid grid-cols-[auto_6.25rem_6.25rem] gap-2 p-3">
        <h3 className="text-title-lg leading-title-lg ml-1">{building.name}</h3>
        {building.images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt=""
            width={100}
            height={67}
            className="object-fill"
          />
        ))}
      </div>
      <ul className="py-1">
        {building.floors.map((floor) => (
          <li key={floor.id}>
            <Interactive
              href={floor.urlFrom(building.slug)}
              className={cn(`state-layer-cream grid h-11 w-full grid-cols-4
                items-center text-start`)}
            >
              <h4
                className={cn(`text-title-md leading-title-md ml-4 font-bold
                  text-white`)}
              >
                {floor.name}
              </h4>
              <p className="text-body-lg leading-body-lg col-span-2">
                {floor.name}
              </p>
              <Icon name="arrow_forward" className="mr-2.5 ml-auto" />
            </Interactive>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default BuildingCard;
