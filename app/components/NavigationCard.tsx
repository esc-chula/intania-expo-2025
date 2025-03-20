import Link from "next/link";
import Card from "./Card";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

/**
 * A Card containing a main navigation route in the main page.
 *
 * @param title The Card title.
 * @param body The Card's body text.
 * @param href Where the Card navigates to.
 * @param children A small box indicating an ongoing event.
 */
const NavigationCard: StyleableFC<{
  title: string;
  body: string;
  href: string;
  children: React.ReactNode;
}> = ({ children, title, body, href, className, style }) => {
  return (
    <Link href={href} className="iex-navigation-card">
      <Card
        className={cn(
          `border-cream relative z-20 mx-4 flex aspect-2/1 
          flex-col items-center border-1`,
          className,
        )}
        style={style}
      >
        <span
          className={cn(
            `text-yellow text-display-md leading-display-md
            mt-3.5 text-center font-bold tracking-[-1px]
            uppercase italic [text-shadow:_4px_4px_0px_var(--color-bright-red)]`,
          )}
          style={{ fontVariationSettings: '\"wdth\" 75' }}
        >
          {title}
        </span>
        <span
          className={cn(
            `text-body-lg leading-body-lg m-1 
            px-1.5 text-center font-semibold whitespace-pre-line`,
          )}
        >
          {body}
        </span>
        <div className="absolute bottom-0 z-30 w-8/15 translate-y-1/6">
          {children}
        </div>
      </Card>
    </Link>
  );
};

export default NavigationCard;
