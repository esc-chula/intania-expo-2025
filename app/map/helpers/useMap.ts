import { useState, useEffect } from "react";

/** If the map is wider than this, it will be scaled down. */
const MAX_MAP_WIDTH_PX = 430;
/** The distance from the edge of the map to the edge of the viewport. */
const MAP_MARGIN_PX = 32;

/** The radius of the YouAreHere marker. */
const MARKER_RADIUS_PX = 8;

/** The width of the map used as a reference for calculating {@link PX_PER_DEGREE}. */
const REFERENCE_MAP_WIDTH_PX = 365;
/** The number of pixels in a degree of latitude. */
const PX_PER_DEGREE = 136241.610738255;
/** The number of pixels in a meter. */
const PX_PER_METER = 1.25;
/** The latitude and longitude of the top left corner of the positioning layer. */
const ORIGIN = { latitude: 13.73768, longitude: 100.53195 };

function scaleDownValue(value: number) {
  return (
    value *
      // Scale to fit the width of the map, which may change based on how wide
      // the viewport is.
      (Math.min(
        window.innerWidth - MAP_MARGIN_PX || MAX_MAP_WIDTH_PX,
        MAX_MAP_WIDTH_PX,
      ) /
        REFERENCE_MAP_WIDTH_PX) -
    // Center the marker.
    MARKER_RADIUS_PX
  );
}

function calculateStyles(coords: GeolocationCoordinates | null) {
  if (!coords) return null;
  const { latitude, longitude, accuracy } = coords;
  const top = scaleDownValue((ORIGIN.latitude - latitude) * PX_PER_DEGREE);
  const left = scaleDownValue((longitude - ORIGIN.longitude) * PX_PER_DEGREE);
  const scale = scaleDownValue(accuracy * PX_PER_METER) / MARKER_RADIUS_PX;
  const rotate = null;
  return {
    positionStyle: { transform: `translate(${left}px, ${top}px)` },
    accuracyStyle: { transform: `scale(${scale})` },
    headingStyle:
      rotate !== null ? { transform: `rotate(${rotate}deg) scale(4)` } : {},
  };
}

export default function useMap() {
  const [position, setPosition] = useState<GeolocationCoordinates | null>(null);
  useEffect(() => {
    const onWatchSuccess = (position: GeolocationPosition) =>
      setPosition(position.coords);
    const watcher = navigator.geolocation.watchPosition(onWatchSuccess);
    return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  const [styles, setStyles] = useState<Record<
    "positionStyle" | "accuracyStyle" | "headingStyle",
    React.CSSProperties
  > | null>(null);
  useEffect(() => {
    const onResize = () => {
      console.log("onResize", calculateStyles(position));
      setStyles(calculateStyles(position));
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [position]);

  return styles;
}
