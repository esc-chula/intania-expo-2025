import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import Gear from "@/public/assets/gear.svg";
import Planet from "@/public/assets/planet.svg";
import Stars from "@/public/assets/stars.svg";
import Sun from "@/public/assets/sun.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const SVG: StyleableFC<
  Pick<ComponentProps<typeof Image>, "src"> &
    Partial<ComponentProps<typeof Image>>
> = (props) => <Image {...props} alt="" priority />;

/** A space-themed background with a planet, stars, and a big spinning gear. */
const Background: StyleableFC = ({ className, style }) => (
  <div
    aria-hidden
    className={cn(
      `iex-background fixed inset-0 -z-10 opacity-50 [--_duration:111s]
      *:absolute *:left-1/2 *:-translate-x-1/2`,
      className,
    )}
    style={style}
  >
    <SVG src={Stars} className="-z-30" />
    <SVG
      src={Gear}
      width={748}
      className={cn(`top-6 -z-20 w-92
        motion-safe:animate-[var(--_duration)_spin_infinite_linear]`)}
    />
    <div className="-z-10 w-250 *:absolute *:inset-0">
      <SVG src={Planet} />
      <SVG
        src={Sun}
        className="motion-safe:animate-[var(--_duration)_sun_infinite_linear]"
      />
    </div>
  </div>
);

export default Background;
