import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

/**
 * A tooltip giving the user instructions on scanning a barcode.
 *
 * @param show Whether to show the tooltip.
 */
const ScanTooltip: StyleableFC<{
  show?: boolean;
}> = ({ show, className, style }) => (
  <div
    aria-hidden={!show}
    className={cn(
      `bg-cream text-dark-gray truncate px-4 py-1 text-center
        transition-all`,
      show ? `translate-y-0 opacity-100` : `translate-y-2 opacity-0`,
      className,
    )}
    style={style}
  >
    ส่องกล้องไปที่บริเวณบาร์โค้ด
  </div>
);

export default ScanTooltip;
