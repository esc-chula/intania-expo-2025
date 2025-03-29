import Interactive from "@/app/components/Interactive";
import cn from "@/lib/helpers/cn";
import Major from "@/lib/models/Major";
import { StyleableFC } from "@/lib/types/misc";

const MajorCard: StyleableFC<{
  major: Major;
}> = ({ major, className, style }) => (
  <Interactive
    aria-label={major.displayName}
    href={`/majors/${major.slug.toLowerCase()}`}
    className={cn(
      `[&_.iex-icon]:text-yellow bg-brown state-layer-white flex h-30
        flex-col items-center gap-5 pt-5`,
      className,
    )}
    style={style}
  >
    {major.icon}
    <h3
      className={cn(`text-title-sm leading-title-sm text-center font-bold
        text-balance max-w-18`)}
    >
      {
        // Civil Engineering displays really badly by default.
        // prettier-ignore
        major.slug === "CE" ? <>วิศวกรรม<br />โยธา</> : major.displayName
      }
    </h3>
  </Interactive>
);

export default MajorCard;
