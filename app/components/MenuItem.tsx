"use client";

import { useContext } from "react";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import { SelectContext } from "@/app/components/Select";

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

  const { value: selectedValue, handleSelect } = context;
  const isSelected =
    Array.isArray(selectedValue) && selectedValue.includes(value);

  return (
    <div
      className={cn(
        `iex-menu-item text-body-lg leading-headline-lg flex h-12 cursor-pointer items-center px-4`,
        isSelected ? "bg-just-red" : "bg-brown",
        "hover:bg-just-red",
        className,
      )}
      data-value={value}
      style={style}
      onClick={() => handleSelect(value)}
    >
      {children}
    </div>
  );
};

export default MenuItem;
