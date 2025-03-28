import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

const AccuracyMarker: StyleableFC = ({ className, style }) => (
  <div
    className={cn(`duration-5000 motion-safe:transition-transform`, className)}
    style={style}
  >
    <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* prettier-ignore */}
      <circle
        cx={8} cy={8} r={8}
        className="fill-yellow/20 border-yellow border-1"
      />
    </svg>
  </div>
);

export default AccuracyMarker;
