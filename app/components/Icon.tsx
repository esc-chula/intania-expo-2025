import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

/**
 * Icon displays a Material Symbol.
 *
 * @param name The icon name (see link below for full list).
 * @param fill Whether to fill the icon. Shouldn’t be done in most cases.
 * @param size Size in pixels.
 *
 * @see {@link https://fonts.google.com/icons Google Fonts}
 */
const Icon: StyleableFC<{
  name: string;
  fill?: boolean;
  size?: number;
}> = ({ name, fill = false, size = 24, className, style }) => {
  const sizeRem = `${size / 16}rem`;
  return (
    <i
      // Hide the icon name from screen readers because sometimes the name
      // doesn't really make sense. In most cases, icons are just a visual aid,
      // except for notably an icon-only button where the screen reader label
      // should already be set from the button itself.
      aria-hidden="true"
      style={{
        ...style,
        // Explicitly setting the size prevents cumulative shifts.
        width: sizeRem,
        height: sizeRem,
        fontSize: sizeRem,
        fontVariationSettings: `"FILL" ${fill ? 1 : 0}, "opsz" ${size}`,
      }}
      className={cn(
        `iex-icon font-icon block leading-none not-italic select-none`,
        className,
      )}
      translate="no"
    >
      {name}
    </i>
  );
};

export default Icon;
