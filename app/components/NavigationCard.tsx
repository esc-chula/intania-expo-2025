import Link from "next/link";
import Card from "./Card";
import cn from "@/lib/helpers/cn";

/**
 * A Card containing a main navigation route in the main page.
 * 
 * @param title The Card title.
 * @param body The Card's body text.
 * @param href Where the Card navigates to.
 * @param adornment A Small box indicating an ongoing event. Append like a property. 
 */
export default function NavigationCard({
  adornment,
  title,
  body,
  href,
}: {
  adornment?: React.ReactNode;
  title: string;
  body: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <Card className="border-cream relative aspect-2/1 flex-col items-center border-1 z-20">
        <span
          className={cn(
            "text-yellow text-center text-headline-lg",
            "sm:text-display-sm font-bold font-stretch-50% italic",
            "[text-shadow:_4px_4px_0px_var(--color-bright-red)]",
          )}
        >
          {title.toUpperCase()}
        </span>
        <span className="font-semibold mt-2 text-center text-body-lg whitespace-pre-line">{body}</span>
        <div className="absolute bottom-0 w-8/15 translate-y-1/6 z-30">
          {adornment}
        </div>
      </Card>
    </Link>
  );
}
