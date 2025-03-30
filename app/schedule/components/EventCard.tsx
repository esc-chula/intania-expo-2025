import Card from "@/app/components/Card";
import cn from "@/lib/helpers/cn";
import Event from "@/lib/models/Event";
import { StyleableFC } from "@/lib/types/misc";

const EventCard: StyleableFC<{
  event: Event;
}> = ({ event, className, style }) => {
  return (
    <Card
      className={cn(
        `text-body-md leading-body-md space-y-1.5 px-4 py-3`,
        className,
      )}
      style={style}
    >
      <h3 className="text-title-md leading-title-md font-bold">{event.name}</h3>
      <div className="-space-y-0.5 *:block">
        <time>{event.formattedTime}</time>
        {event.location && <span>{event.location.formatted}</span>}
      </div>
      {event.body && <p className="">{event.body}</p>}
    </Card>
  );
};

export default EventCard;
