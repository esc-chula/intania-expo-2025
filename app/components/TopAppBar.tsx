import cn from "@/lib/helpers/cn";
import { StylableFC } from "@/lib/types/misc";
import Icon from "./Icon";

/**
 * Top App Bar displays the page name and a back button to navigate up.
 *
 * @param children The name of the page.
 * @param parentURL The URL to navigate up to.
 * 
 * @note A temporary example to what a component can look like.
 */
const TopAppBar: StylableFC<{
  children: React.ReactNode;
  parentURL?: string;
}> = ({ children, parentURL, className, style }) => (
  <header
    className={cn(
      `bg-dark-red fixed top-0 flex h-16 w-screen max-w-108 items-center gap-4
      px-4 text-white`,
      className,
    )}
    style={style}
  >
    {parentURL && <Icon name="arrow_back" />}
    <h1
      className={cn(`text-headline-sm leading-headline-sm grow truncate
        font-bold`)}
    >
      {children}
    </h1>
  </header>
);

export default TopAppBar;
