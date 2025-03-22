import Button from "@/app/components/Button";
import Countdown from "@/app/components/Countdown";
import Logo from "@/app/components/Logo";
import NavigationCard from "@/app/components/NavigationCard";
import { EVENT_START_DATE } from "@/lib/config";
import cn from "@/lib/helpers/cn";

export default function Home() {
  return (
    <div className="pb-20">
      <section
        className={cn(`flex h-dvh flex-col items-center justify-center pt-7
          pb-20 text-center sm:h-auto`)}
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
        <div aria-hidden className="min-h-14 grow" />
        <Button
          appearance="tonal"
          // TODO: Replace with Google authentication.
          href="/terms"
        >
          สมัครเลย
        </Button>
      </section>
      <section className="space-y-4">
        <NavigationCard
          title="Coming Soon"
          body="ใกล้ถึงงานแล้ว ตื่นเต้นๆ ! อย่าลืมกลับมาดูทีหลังด้วยนะ"
        />
      </section>
    </div>
  );
}
