import Icon from "@/app/components/Icon";
import cn from "@/lib/helpers/cn";
import WorkshopSlot from "@/lib/models/WorkshopSlot";
import { StyleableFC } from "@/lib/types/misc";

const WorkshopSlotElement: StyleableFC<{
  workshopSlot: WorkshopSlot;
}> = ({ workshopSlot, className, style }) => {
  return (
    <li className={cn(`flex items-center gap-1.5`, className)} style={style}>
      <span className="bg-cream text-dark-gray flex pr-1 pl-0.5">
        <Icon name="person" size={16} />
        <span className="text-body-sm leading-body-sm">
          {workshopSlot.maxRegistrantCount}
        </span>
      </span>
      <span>{workshopSlot.formattedStartTime}</span>
    </li>
  );
};

export default WorkshopSlotElement;
