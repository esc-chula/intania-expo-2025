import Button from "@/app/components/Button";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

/**
 * A sheet that informs the user of the result of fetching the barcode data.
 * 
 * @param show Whether to show the sheet.
 * @param onCheckIn The callback when the visitor is checked in.
 */
const ScanSheet: StyleableFC<{
  show?: boolean;
  onCheckIn: () => void;
}> = ({ show, onCheckIn, className, style }) => {
  return (
    <div
      className={cn(
        `text-dark-gray left-1/2 h-110 w-70 -translate-x-1/2
        bg-[url('/assets/ticket-shape.svg')] bg-contain bg-center bg-no-repeat
        transition-all`,
        show ? `translate-y-0 opacity-100` : `translate-y-full opacity-0`,
        className,
      )}
      style={style}
    >
      <Button
        appearance="outlined-light"
        onClick={onCheckIn}
        // Temporary, until real Ticket is implemented
        className="absolute top-60 left-1/2 -translate-x-1/2"
      >
        เช็คอิน
      </Button>
    </div>
  );
};

export default ScanSheet;
