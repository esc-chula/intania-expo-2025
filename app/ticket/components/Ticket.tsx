import Logo from "@/app/components/Logo";
import cn from "@/lib/helpers/cn";
import Visitor from "@/lib/models/Visitor";
import { StyleableFC } from "@/lib/types/misc";

const Ticket: StyleableFC<{
  children?: React.ReactNode;
  visitor: Visitor;
}> = ({ visitor, className, style }) => {
  return (
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
        <section className="font-bold mb-7">
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
          <section>
            <h2>เวลาเข้าร่วมงาน</h2>
            <p>{visitor.formattedLastVisitDate}</p>
          </section>
        </section>
      </section>
      <section></section>
    </article>
  );
};

export default Ticket;
