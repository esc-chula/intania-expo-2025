"use client";

import Button from "@/app/components/Button";
import Card from "@/app/components/Card";
import Icon from "@/app/components/Icon";
import Interactive from "@/app/components/Interactive";
import WorkshopSlotElement from "@/app/quest/components/WorkshopSlotElement";
import { EVENT_DATES } from "@/lib/config";
import cn from "@/lib/helpers/cn";
import getWeekday from "@/lib/helpers/getWeekday";
import Workshop from "@/lib/models/Workshop";
import { StyleableFC } from "@/lib/types/misc";
import { useState } from "react";

const WorkshopCard: StyleableFC<{
  workshop: ConstructorParameters<typeof Workshop>[0];
}> = ({ workshop: plainWorkshop, className, style }) => {
  const workshop = new Workshop(plainWorkshop);
  const [expanded, setExpanded] = useState(false);
  const [selectedDate, setSelectedDate] = useState<
    (typeof EVENT_DATES)[number]
  >(EVENT_DATES[0]);

  const upcomingSlots = workshop.getSlotsByTime(selectedDate);
  const passedSlots = workshop.getSlotsByTime(selectedDate, true);

  return (
    <Card
      className={cn(`text-body-md leading-body-md`, className)}
      style={style}
    >
      <div className="flex items-center p-3">
        <div className="grow">
          <h3 className="text-title-md leading-title-md font-bold">
            {workshop.name}
          </h3>
          <span className="text-body-md leading-body-md">
            {workshop.intaniaLocation.formatted}
          </span>
        </div>
        <Button appearance="text" onClick={() => setExpanded(!expanded)}>
          <Icon
            name="expand_more"
            className={cn(`transition-transform`, expanded && `-scale-y-100`)}
          />
        </Button>
      </div>
      <div
        className={cn(
          `space-y-4 pb-4 [&_ul]:flex [&_ul]:flex-wrap
          [&_ul:not([role='navigation'])]:gap-x-5
          [&_ul:not([role='navigation'])]:gap-y-3`,
          !expanded && `hidden`,
        )}
      >
        <ul
          role="navigation"
          className="border-cream mb-4 flex flex-nowrap border-b-1"
        >
          {EVENT_DATES.map((date) => (
            <li key={date.toISOString()}>
              <Interactive
                onClick={() => setSelectedDate(date)}
                className={cn(
                  `w-full border-b-2 border-transparent p-3 pb-2.5 text-left
                  transition-all`,
                  selectedDate === date
                    ? `state-layer-yellow border-yellow font-bold`
                    : `state-layer-white border-transparent`,
                )}
              >
                {getWeekday(date)}
              </Interactive>
            </li>
          ))}
        </ul>
        {upcomingSlots.length > 0 && (
          <ul className="px-4">
            {upcomingSlots.map((slot) => (
              <WorkshopSlotElement key={slot.id} workshopSlot={slot} />
            ))}
          </ul>
        )}
        {passedSlots.length > 0 && (
          <section className="space-y-3">
            <h4 className="text-title-sm leading-title-sm px-4 font-bold">
              ผ่านไปแล้ว
            </h4>
            <ul className="px-4 opacity-50">
              {passedSlots.map((slot) => (
                <WorkshopSlotElement key={slot.id} workshopSlot={slot} />
              ))}
            </ul>
          </section>
        )}
      </div>
    </Card>
  );
};

export default WorkshopCard;
