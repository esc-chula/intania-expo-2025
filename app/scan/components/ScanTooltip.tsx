import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

/**
 * A tooltip giving the user instructions on scanning a barcode.
 *
 * @param open Whether to show the tooltip.
 */
const ScanTooltip: StyleableFC<{
  open?: boolean;
  sixDigitCode: string | null;
}> = ({ open, sixDigitCode, className, style }) => {
  return (
    <p
      aria-hidden={!open}
      className={cn(
        `bg-cream text-dark-gray truncate px-4 py-1 text-center
        transition-all`,
        open ? `translate-y-0 opacity-100` : `translate-y-2 opacity-0`,
        sixDigitCode ? `w-64` : `w-56`,
        className,
      )}
      style={style}
    >
      {sixDigitCode
        ? `กำลังค้นหาผู้ร่วมงาน ${sixDigitCode}…`
        : "ส่องกล้องไปที่บริเวณบาร์โค้ด"}
    </p>
  );
};

export default ScanTooltip;
