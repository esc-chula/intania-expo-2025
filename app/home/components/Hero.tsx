import Countdown from "@/app/components/Countdown";
import Logo from "@/app/components/Logo";
import { EVENT_START_DATE } from "@/lib/config";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

const Hero: StyleableFC<{
  children: React.ReactNode;
}> = ({ children, className, style }) => (
  <section
    className={cn(
      `flex h-dvh flex-col items-center justify-center pt-7 pb-10 text-center
      sm:h-auto`,
      className,
    )}
    style={style}
  >
    <Logo size={280} />
    <section
      className={cn(`text-cream leading-headline-sm text-headline-sm -mt-3
        space-y-2 italic [&_*]:block`)}
    >
      <time className="font-bold">28–30 March 2025</time>
      <address className="-space-y-1">
        <span>Faculty of Engineering</span>
        <span>Chulalongkorn University</span>
      </address>
    </section>
    <Countdown date={EVENT_START_DATE} className="mt-11" />
    <div aria-hidden className="min-h-14 grow" />
    {children}
  </section>
);

export default Hero;
