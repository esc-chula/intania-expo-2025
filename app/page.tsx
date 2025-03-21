import Button from "@/app/components/Button";
import Countdown from "@/app/components/Countdown";
import Logo from "@/app/components/Logo";
import { EVENT_START_DATE } from "@/lib/config";
import cn from "@/lib/helpers/cn";

export default function Home() {
  return (
    <div
      className={cn(`flex flex-col items-center justify-center px-4 pt-7 pb-10
        text-center`)}
    >
      <Logo size={280} />
      <section
        className={cn(`text-cream leading-headline-sm text-headline-sm
          -mt-3 space-y-2 italic [&_*]:block`)}
      >
        <time className="font-bold">28–30 March 2025</time>
        <address className="-space-y-1">
          <span>Faculty of Engineering</span>
          <span>Chulalongkorn University</span>
        </address>
      </section>
      <Countdown date={EVENT_START_DATE} className="mt-11" />
      <Button appearance="tonal" className="mt-27">
        สมัครเลย
      </Button>
    </div>
  );
}
