import Button from "@/app/components/Button";
import Icon from "@/app/components/Icon";
import Ticket from "@/app/ticket/components/Ticket";
import cn from "@/lib/helpers/cn";
import Visitor from "@/lib/models/Visitor";
import { StyleableFC } from "@/lib/types/misc";

const STATUS_MESSAGES = {
  404: { iconName: "person_cancel", message: "ไม่พบผู้เข้าร่วมงานนี้" },
  409: { iconName: "done_all", message: "ผู้เข้าร่วมงานนี้ได้เช็คอินแล้ว" },
  generic: { iconName: "error", message: "เกิดข้อผิดพลาดในการเช็คอิน" },
};

/**
 * A sheet that informs the user of the result of fetching the barcode data.
 *
 * @param show Whether to show the sheet.
 * @param onCheckIn The callback when the visitor is checked in.
 */
const ScanSheet: StyleableFC<{
  visitor: Visitor | null;
  status: number | null;
  onCheckIn: () => void;
}> = ({ visitor, status, onCheckIn, className, style }) => {
  const { iconName, message } =
    STATUS_MESSAGES[String(status) as keyof typeof STATUS_MESSAGES] ||
    STATUS_MESSAGES.generic;

  return (
    <div
      className={cn(
        `transition-all`,
        !visitor &&
          `text-dark-gray h-110 w-70 bg-[url('/assets/ticket-shape.svg')]
          bg-contain bg-center bg-no-repeat text-center`,
        visitor || status
          ? `translate-y-0 opacity-100`
          : `translate-y-full opacity-0`,
        className,
      )}
      style={style}
    >
      <div className="fixed inset-0" />
      {visitor ? (
        <Ticket visitor={visitor} hideStub>
          <Button appearance="outlined-light" onClick={onCheckIn}>
            เช็คอิน
          </Button>
        </Ticket>
      ) : (
        <article className="space-y-4 px-5 pt-9">
          <Icon name={iconName} size={48} className="text-bright-red mx-auto" />
          <h1 className="text-title-lg leading-title-lg font-bold">
            {message}
          </h1>
        </article>
      )}
    </div>
  );
};

export default ScanSheet;
