"use client";

import Icon from "@/app/components/Icon";
import Interactive from "@/app/components/Interactive";
import { SelectContext } from "@/app/components/Select";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import { useContext } from "react";

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
  const { values, handleSelect, name, required, maxChoices, isMenuOpen } =
    context;
  const isSelected =
    values.find((_value) => _value.value === value) !== undefined;

  return (
    <Interactive
      data-value={value}
      disabled={!isMenuOpen}
      onClick={() => handleSelect(value, children as string)}
      className={cn(
        `iex-menu-item text-body-lg leading-body-lg state-layer-white flex
        items-center gap-4 px-3.5 py-2.5 text-start text-balance`,
        isSelected && `bg-just-red`,
        className,
      )}
      style={style}
    >
      {maxChoices !== 1 && (
        <Icon
          name={isSelected ? "check_box" : "check_box_outline_blank"}
          fill={isSelected}
          className={cn(
            `transition-all`,
            isSelected ? `opacity-100` : `opacity-50`,
          )}
        />
      )}

      <input
        aria-hidden
        tabIndex={-1}
        {...(maxChoices === 1
          ? { type: "radio", id: value, name, value }
          : { type: "checkbox" })}
        checked={isSelected}
        // Make the input required if no values are selected and the field is
        // required.
        required={values.length < 1 && required}
        onChange={() => {}} // Prevents React warning
        className="sr-only"
      />
      {children}
    </Interactive>
  );
};

export default MenuItem;
