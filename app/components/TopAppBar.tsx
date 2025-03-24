"use client";

import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import { useEffect, useState } from "react";

/**
 * Top App Bar displays the page name, a back button to navigate up, and related
 * actions.
 *
 * @param children The name of the page.
 * @param appearance Whether the background is fully filled, a scrim, or transaparent until scrolled.
 */
const TopAppBar: StyleableFC<{
  children: React.ReactNode;
  appearance?: "filled" | "scrim" | "minimal";
}> = ({ children, appearance = "filled", className, style }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () =>
      setScrolled(window.scrollY > (appearance === "minimal" ? 100 : 0));
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [appearance]);

  return (
    <header
      className={cn(
        `iex-top-app-bar text-headline-sm leading-headline-sm fixed top-0
        bottom-auto z-40 flex h-16 w-screen max-w-108 -translate-x-4
        items-center gap-2 px-2 text-white transition-colors [&_h1]:grow
        [&_h1]:truncate [&_h1]:font-bold [&_h1]:transition-opacity`,
        {
          filled: `bg-black`,
          scrim: scrolled
            ? `bg-black`
            : `*:z-10 before:absolute before:inset-0 before:h-30
              before:bg-gradient-to-b before:from-black before:to-transparent
              before:content-['']`,
          minimal: scrolled ? `bg-black` : `[&_h1]:opacity-0`,
        }[appearance],
        className,
      )}
      style={style}
    >
      {children}
    </header>
  );
};

export default TopAppBar;
