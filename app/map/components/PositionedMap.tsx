"use client";

import Button from "@/app/components/Button";
import Icon from "@/app/components/Icon";
import AccuracyMarker from "@/app/map/components/AccuracyMarker";
import HeadingMarker from "@/app/map/components/HeadingMarker";
import PositionMarker from "@/app/map/components/PositionMarker";
import useMap from "@/app/map/helpers/useMap";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import Image, { StaticImageData } from "next/image";

const PERMISSION_MESSAGES = {
  location: {
    iconName: "near_me",
    message: "กรุณาอนุญาตให้เราแสดงตำแหน่งของคุณ",
  },
  orientation: {
    iconName: "explore",
    message: "กรุณาให้เราแสดงทิศทางเข็มทิศ",
  },
};

const PositionedMap: StyleableFC<{
  children: React.ReactNode;
  src: StaticImageData;
}> = ({ children, src, className, style }) => {
  const { styles, startCompass, isPermittedLocation, isPermittedOrientation } =
    useMap();
  const { positionStyle, accuracyStyle, headingStyle } = styles || {};
  const activeMessage = !isPermittedLocation
    ? "location"
    : !isPermittedOrientation
      ? "orientation"
      : null;

  return (
    <div>
      <div className="relative overflow-hidden">
        <Image src={src} alt="แผนที่" quality={100} priority />
        <div className="pointer-events-none absolute inset-0">
          <div
            className={cn(
              `ease-emphasized-decelerate relative -top-7.5 -left-5 h-full w-full
              rotate-9 transition-all duration-1000`,
              styles ? `translate-y-0 opacity-100` : `-translate-y-1 opacity-0`,
              className,
            )}
            style={style}
          >
            {styles && (
              <PositionMarker className="-rotate-9" style={positionStyle}>
                <AccuracyMarker style={accuracyStyle} />
                <HeadingMarker style={headingStyle} />
              </PositionMarker>
            )}
          </div>
        </div>
      </div>
      {children}
      {activeMessage && (
        <div className="bg-yellow mt-6 flex h-10 items-center text-black">
          <Icon
            name={PERMISSION_MESSAGES[activeMessage].iconName}
            className="mx-2.5"
          />
          <p className="grow">{PERMISSION_MESSAGES[activeMessage].message}</p>
          {activeMessage === "orientation" && (
            <Button
              appearance="text"
              onClick={startCompass}
              className="!state-layer-black"
            >
              อนุญาต
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default PositionedMap;
