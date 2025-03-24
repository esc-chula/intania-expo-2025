"use client";

import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import Barcode from "react-barcode";

/**
 * The bottom part of the ticket that contains the barcode.
 * @param sixDigitCode The six-digit code to be displayed on the ticket.
 */
const TicketStub: StyleableFC<{
  sixDigitCode: string;
}> = ({ sixDigitCode, className, style }) => (
  <section
    className={cn(`flex flex-col items-center gap-2.5 py-5`, className)}
    style={style}
  >
    <Barcode
      value={sixDigitCode}
      height={64}
      displayValue={false}
      margin={0}
      background="transparent"
    />
    <span className="text-body-sm leading-body-sm">{sixDigitCode}</span>
  </section>
);

export default TicketStub;
