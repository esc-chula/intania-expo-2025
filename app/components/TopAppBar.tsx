import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

/**
 * Top App Bar displays the page name, a back button to navigate up, and related
 * actions.
 *
 * @param children The name of the page.
 * @param appearance Whether the background is fully filled or fading scrim.
 */
const TopAppBar: StyleableFC<{
  children: React.ReactNode;
  appearance?: "filled" | "scrim";
}> = ({ children, appearance = "filled", className, style }) => (
  <header
    className={cn(
      `text-headline-sm leading-headline-sm fixed top-0 flex h-16 w-screen
      max-w-108 items-center gap-2 px-2 text-white [&_h1]:grow
      [&_h1]:truncate [&_h1]:font-bold`,
      {
        filled: `bg-dark-red`,
        scrim: `*:z-10 before:absolute before:inset-0 before:h-30
          before:bg-gradient-to-b before:from-black before:to-transparent
          before:content-['']`,
      }[appearance],
      className,
    )}
    style={style}
  >
    {children}
  </header>
);

export default TopAppBar;
