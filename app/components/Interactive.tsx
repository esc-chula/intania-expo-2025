"use client";

import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import { useRef, useState } from "react";

/**
 * Indicates interactivity with a ripple effect. The background and state layer
 * colors are applied through Tailwind classes like `bg-brown` and
 * `state-layer-white`.
 *
 * @param children The content.
 * @param href Transforms Interactive into an anchor tag.
 * @param onClick Transforms Interactive into a button.
 */
const Interactive: StyleableFC<
  {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
  } & React.AriaAttributes
> = ({ children, href, onClick, className, style, ...props }) => {
  const Element = href ? `a` : onClick ? `button` : `div`;

  const rippleContainerRef = useRef<HTMLSpanElement>(null);
  const [touched, setTouched] = useState(false);

  /**
   * Get the position of the ripple relative to the ripple container.
   *
   * @param clientX The x-coordinate of the mouse/touch event.
   * @param clientY The y-coordinate of the mouse/touch event.
   *
   * @returns The x and y coordinates of the ripple.
   */
  function getRipplePosition({
    clientX,
    clientY,
  }: Pick<Touch, "clientX" | "clientY">) {
    const rect = rippleContainerRef.current?.getBoundingClientRect();
    if (!rect) return [0, 0];
    return [clientX - rect.left, clientY - rect.top];
  }

  /**
   * Create a ripple effect at the given position.
   *
   * @param x The x-coordinate of the ripple.
   * @param y The y-coordinate of the ripple.
   */
  function startRipple(x: number, y: number) {
    const rippleContainer = rippleContainerRef.current;
    if (!rippleContainer) return;

    const ripple = document.createElement(`span`);
    ripple.className = cn(`iex-ripple absolute aspect-square rounded-full
      blur-md opacity-25`);
    ripple.style.transform = `scale(0)`;
    ripple.style.transition = `transform 0.5s, opacity 0.5s`;
    rippleContainer.appendChild(ripple);

    const rect = rippleContainer.getBoundingClientRect();
    const diameter = Math.max(rect.width, 80);

    ripple.style.left = x - diameter / 2 + `px`;
    ripple.style.top = y - diameter / 2 + `px`;
    ripple.style.width = diameter + `px`;
    ripple.style.transform = `scale(4)`;
    ripple.style.opacity = `0`;

    setTimeout(() => ripple.remove(), 500);
  }

  return (
    <Element
      href={href}
      onClick={onClick}
      onTouchStart={(event: React.TouchEvent) => {
        setTouched(true);
        const touch = event.touches[0];
        const [x, y] = getRipplePosition(touch);
        startRipple(x, y);
      }}
      onMouseEnter={() => setTouched(false)}
      onMouseDown={(event: React.MouseEvent) => {
        // Prevent double ripples on touch devices.
        if (touched) return;
        const [x, y] = getRipplePosition(event);
        startRipple(x, y);
      }}
      onKeyDown={(event: React.KeyboardEvent) => {
        if (![`Enter`, ` `].includes(event.key) || touched) return;
        if (!rippleContainerRef?.current) return;
        const rect = rippleContainerRef.current.getBoundingClientRect();
        startRipple(rect.width / 2, rect.height / 2);
      }}
      className={cn(
        `overflow-hidden before:absolute before:inset-0 before:rounded-[inherit]
        before:opacity-0 before:content-[''] hover:before:opacity-8
        focus-visible:before:opacity-10 active:before:opacity-10`,
        className,
      )}
      style={style}
      {...props}
    >
      <span
        aria-hidden
        ref={rippleContainerRef}
        className="absolute inset-0 blur-xs"
      />
      {children}
    </Element>
  );
};

export default Interactive;
