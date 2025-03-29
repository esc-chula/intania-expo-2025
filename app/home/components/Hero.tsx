import Countdown from "@/app/components/Countdown";
import Logo from "@/app/components/Logo";
import { EVENT_START_DATE } from "@/lib/config";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

/**
 * Hero section of the home page.
 * @param children The call to action.
 */
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
    <style>{`
      .iex-background {
        opacity: 1;
        position: static;
      }
      .iex-background > * {
        position: fixed;
      }
    `}</style>
    <Logo size={280} className="relative -z-20" />
    <section
      className={cn(`text-cream leading-headline-sm text-headline-sm -mt-3
        space-y-2 italic *:-space-y-1 [&_*]:block`)}
    >
      <time className="font-bold">
        <span>30 March 2025</span>
        <span>10:00–17:00</span>
      </time>
      <address>
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
