import Interactive from "@/app/components/Interactive";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

/**
 * An action the user can take.
 *
 * @param children The text or icon inside the button.
 * @param appearance The emphasis level of the button.
 * @param size The size of the button.
 * @param disabled Reduces opacity to communicate that the button isn’t available.
 * @param alt Alt text in case the button has no text.
 * @param href See {@link Interactive}.
 * @param onClick See {@link Interactive}.
 */
const Button: StyleableFC<{
  children: React.ReactNode;
  appearance: "filled" | "tonal" | "outlined" | "outlined-light" | "text";
  size?: "small" | "large";
  disabled?: boolean;
  alt?: string;
  href?: string;
  onClick?: () => void;
}> = ({
  children,
  appearance,
  size = "large",
  disabled = false,
  alt,
  href,
  onClick,
  className,
  style,
}) => {
  return (
    <Interactive
      aria-label={alt}
      aria-disabled={disabled}
      href={href}
      onClick={!disabled ? onClick : undefined}
      className={cn(
        `iex-button text-body-md leading-body-md relative grid
        cursor-pointer place-content-center [&:has(.iex-icon)]:aspect-square
        [&:not(:has(.iex-icon))]:font-bold`,
        {
          filled: `bg-cream state-layer-dark-gray`,
          tonal: `bg-bright-red state-layer-white`,
          outlined: `border-cream state-layer-white border-1`,
          "outlined-light": `border-brown state-layer-brown border-1`,
          text: `state-layer-white [&:has(.iex-icon)]:rounded-full `,
        }[appearance],
        {
          small: `h-8 [&:not(:has(.iex-icon))]:px-3.5`,
          large: `h-10 [&:not(:has(.iex-icon))]:px-6`,
        }[size],
        disabled && `pointer-events-none opacity-50`,
        className,
      )}
      style={style}
    >
      {children}
    </Interactive>
  );
};

export default Button;
