"use client";

import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import { useEffect, useRef } from "react";

/**
 * A box that displays a single segment of a countdown timer.
 *
 * @param segments All segments of the countdown timer, each with its calculated value, maximum value, and label.
 * @param index The index of the segment in the `segments` array.
 */
const CountdownBox: StyleableFC<{
  segments: { value: number; max: number; label: string }[];
  index: number;
}> = ({ segments, index: i, className, style }) => {
  const { value, label } = segments[i];

  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const span = ref.current;
    const fadeOutClassList = ["translate-y-0.5", "opacity-0", "duration-100"];
    if (!span) return;
    // For the seconds segment and when the next segment is zero, animate the
    // fade-out effect.
    if (
      // i === segments.length - 1 ||
      segments.slice(i + 1).every(({ value }) => value === 0)
    ) {
      setTimeout(() => span.classList.add(...fadeOutClassList), 800);
      setTimeout(() => span.classList.remove(...fadeOutClassList), 1000);
    }
  }, [segments, value, i]);

  return (
    <li
      className={cn(
        `bg-cream text-dark-gray aspect-square w-15 -space-y-2 text-center
        *:block`,
        className,
      )}
      style={style}
    >
      <span
        ref={ref}
        className={cn(`text-display-sm leading-display-sm font-black italic
          transition-all`)}
        // Justification: this changes every second and does not impact the
        // layout.
        suppressHydrationWarning
      >
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-title-md leading-title-md font-width-110">
        {label}
      </span>
    </li>
  );
};

export default CountdownBox;
