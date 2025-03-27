"use client";

import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

/**
 * A box for displaying a single digit of a code.
 *
 * @param digit The digit to display.
 * @param loading Whether the digit is part of a loading field.
 */
const CodeDigitBox: StyleableFC<{
  digit: string;
  loading?: boolean;
}> = ({ digit, loading, className, style }) => {
  return (
    <div
      className={cn(
        `text-display-sm leading-display-sm grid h-18 w-13 place-items-center
        font-black italic transition-colors`,
        loading ? `bg-just-red text-cream` : `bg-cream text-dark-gray`,
        className,
      )}
      style={style}
    >
      {digit}
    </div>
  );
};

export default CodeDigitBox;
