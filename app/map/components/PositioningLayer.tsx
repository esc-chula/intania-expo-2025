"use client";

import AccuracyMarker from "@/app/map/components/AccuracyMarker";
import HeadingMarker from "@/app/map/components/HeadingMarker";
import PositionMarker from "@/app/map/components/PositionMarker";
import useMap from "@/app/map/helpers/useMap";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

const PositioningLayer: StyleableFC = ({ className, style }) => {
  const styles = useMap();
  const { positionStyle, accuracyStyle, headingStyle } = styles || {};

  return (
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
  );
};

export default PositioningLayer;
