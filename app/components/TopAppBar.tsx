import cn from "@/lib/helpers/cn";
import { StylableFC } from "@/lib/types/misc";

/**
 * Top App Bar displays the page name and a back button to navigate up.
 *
 * @param children The name of the page.
 * @param parentURL The URL to navigate up to.
 */
const TopAppBar: StylableFC<{
  children: React.ReactNode;
  parentURL?: string;
}> = ({ children, className, style }) => (
  <header
    className={cn(
      `bg-dark-red fixed top-0 flex h-16 w-screen max-w-108 items-center gap-4
      px-4 text-white`,
      className,
    )}
    style={style}
  >
    <div className="border-bright-red h-6 w-6 border-1" /> {/* Placeholder */}
    <h1
      className={cn(`text-headline-sm leading-headline-sm grow truncate
        font-bold`)}
    >
      {children}
    </h1>
  </header>
);

export default TopAppBar;
