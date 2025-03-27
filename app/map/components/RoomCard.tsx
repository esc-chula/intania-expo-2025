import Card from "@/app/components/Card";
import cn from "@/lib/helpers/cn";
import Room from "@/lib/models/Room";
import { StyleableFC } from "@/lib/types/misc";

const RoomCard: StyleableFC<{ room: Room }> = ({ room, className, style }) => {
  return (
    <Card className={cn(`space-y-2 px-4 py-3`, className)} style={style}>
      <h3 className="text-title-md leading-title-md flex font-bold">
        <span className={cn(room.event && `w-14`)}>{room.name}</span>
        {room.event && <span className="text-cream">{room.event}</span>}
      </h3>
      {room.body && <p className="text-body-md leading-body-md">{room.body}</p>}
    </Card>
  );
};

export default RoomCard;
