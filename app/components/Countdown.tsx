"use client";

import CountdownBox from "@/app/components/CountdownBox";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import { list } from "radash";
import { useEffect, useState } from "react";

/**
 * A countdown timer that displays the time remaining until a given date in
 * days, hours, minutes, and seconds.
 *
 * @param date The date to count down to.
 */
const Countdown: StyleableFC<{
  date: Date;
}> = ({ date, className, style }) => {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const diff = now
    ? date.getTime() - now.getTime()
    : // Default cannot be 0 because that triggers an animation.
      1000;
  if (diff < 0)
    return (
      <section className={cn(`relative flex gap-2`, className)} style={style}>
        <p
          className={cn(`text-body-lg leading-body-lg absolute top-1/2 left-1/2
            -translate-1/2`)}
        >
          งานเริ่มแล้ว!
        </p>
        {list(3).map((_, i) => (
          <div aria-hidden key={i} className="bg-dark-red aspect-square w-15" />
        ))}
      </section>
    );

  // prettier-ignore
  const segments = [
    { value: Math.floor(diff / (1000 * 60 * 60 * 24)), max: 99, label: "days" },
    { value: Math.floor((diff / (1000 * 60 * 60)) % 24), max: 24, label: "hrs" },
    { value: Math.floor((diff / (1000 * 60)) % 60), max: 60, label: "min" },
    { value: Math.floor((diff / 1000) % 60), max: 60, label: "sec" },
  ];

  return (
    <ul
      role="list"
      className={cn(
        `flex gap-2`,
        // Hide numbers on server-side render.
        !now &&
          `[&_span:first-child]:translate-y-0.5 [&_span:first-child]:opacity-0`,
        className,
      )}
      style={style}
    >
      {segments.map((_, i) => (
        <CountdownBox key={i} segments={segments} index={i} />
      ))}
    </ul>
  );
};

export default Countdown;
