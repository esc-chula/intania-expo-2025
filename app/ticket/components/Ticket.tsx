import Logo from "@/app/components/Logo";
import TicketStub from "@/app/ticket/components/TicketStub";
import cn from "@/lib/helpers/cn";
import Visitor from "@/lib/models/Visitor";
import { StyleableFC } from "@/lib/types/misc";

/**
 * This e-ticket admits the user to Intania Expo 2025. Staff will scan the
 * barcode located at the bottom of the ticket to verify the user’s identity.
 *
 * @param children Replaces the bottom info item.
 * @param visitor The visitor information to be displayed on the ticket.
 */
const Ticket: StyleableFC<{
  children?: React.ReactNode;
  visitor: Visitor;
  hideStub?: boolean;
}> = ({ children, visitor, hideStub, className, style }) => (
  <article
    className={cn(
      `text-dark-gray h-110 w-70 bg-[url('/assets/ticket-shape.svg')]
        bg-contain bg-center bg-no-repeat text-center`,
      className,
    )}
    style={style}
  >
    <section className="flex flex-col items-center justify-center py-6.5">
      <Logo size={80} className="-mt-2" />
      <section className="mb-7 font-bold">
        <h2 className="text-title-lg leading-title-lg">{visitor.fullName}</h2>
        <p className="text-body-md leading-body-md text-just-red">
          {visitor.formattedCategory}
        </p>
      </section>
      <section
        className={cn(
          `[&_h2]:text-body-sm [&_h2]:leading-body-sm text-body-lg
          leading-body-lg [&_h2]:text-just-red space-y-4 [&_h2]:font-bold`,
        )}
      >
        <section>
          <h2>เบอร์โทร</h2>
          <p>{visitor.formattedPhone}</p>
        </section>
        {children || (
          <section>
            <h2>{visitor.ticketHighlight.label}</h2>
            <p>{visitor.ticketHighlight.value}</p>
          </section>
        )}
      </section>
    </section>
    {!hideStub && <TicketStub sixDigitCode={visitor.sixDigitCode} />}
  </article>
);

export default Ticket;
