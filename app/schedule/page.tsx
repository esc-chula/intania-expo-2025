import Button from "@/app/components/Button";
import Icon from "@/app/components/Icon";
import TopAppBar from "@/app/components/TopAppBar";
import EventCard from "@/app/schedule/components/EventCard";
import { EVENT_START_DATE, LOCALE } from "@/lib/config";
import cn from "@/lib/helpers/cn";
import Event, { EVENT_GROUP } from "@/lib/models/Event";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activity schedule",
  description:
    "Intania Expo เรามีกิจกรรมแน่นเอี๊ยด มาดูกันว่าวันงานมีกิจกรรมอะไรบ้าง",
};

export const revalidate = 60;

export default async function Page() {
  const { data } = await Event.fetchAll();
  const events = Event.groupByDate(data || []);

  return (
    <div
      className={cn(`[&_h2]:text-headline-sm [&_h2]:leading-headline-sm
        space-y-8 pt-16 pb-4 [&_h2]:font-bold [&_p]:mt-1 [&_ul]:mt-4 [&_ul]:space-y-4`)}
    >
      <TopAppBar>
        <Button appearance="text" href="/">
          <Icon name="arrow_back" />
        </Button>
        <h1>Activity schedule</h1>
      </TopAppBar>

      {events[EVENT_GROUP.Now].length > 0 && (
        <section aria-labelledby="now">
          <h2 id="now">
            <div
              aria-hidden
              className={cn(`bg-bright-red mx-2 my-0.5 inline-block
                aspect-square h-3 animate-pulse rounded-full`)}
            />
            Happening now
          </h2>
          <ul role="list">
            {events[EVENT_GROUP.Now].map((event) => (
              <li key={event.id}>
                <EventCard event={event} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="expo">
        <h2 id="expo">Intania Expo</h2>
        <p>
          กิจกรรมในวันงาน{" "}
          {EVENT_START_DATE.toLocaleDateString(LOCALE, { dateStyle: "medium" })}
        </p>
        <ul role="list">
          {events[EVENT_GROUP.Expo].map((event) => (
            <li key={event.id}>
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="later">
        <h2 id="later">Later this year</h2>
        <p>กิจกรรมเพิ่มเติมหลังจากปิดงาน</p>
        <ul role="list">
          {events[EVENT_GROUP.Later].map((event) => (
            <li key={event.id}>
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
