"use client";

import { SelectContext } from "@/app/components/Select";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import { useContext } from "react";
import Interactive from "./Interactive";

/**
 * A choice in a menu.
 *
 * @param children The menu item content. Can include text and a checkbox.
 * @param value The identifier for use within select.
 */
const MenuItem: StyleableFC<{
  children: React.ReactNode;
  value: string;
}> = ({ children, value, className, style }) => {
  const context = useContext(SelectContext);
  if (!context) throw new Error("MenuItem must be a child of Select.");
  const { value: selectedValue, handleSelect, } = context;

  return (
    <Interactive
      className={cn(
        `iex-menu-item text-body-lg leading-headline-lg state-layer-white flex
        h-12 items-center px-4`,
        selectedValue.includes(value) && `bg-just-red`,
        className,
      )}
      data-value={value}
      style={style}
      onClick={() => handleSelect(value, children as string)}
    >
      {children}
    </Interactive>
  );
};

export default MenuItem;
