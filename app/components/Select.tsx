"use client";

import Menu from "@/app/components/Menu";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import React, { createContext, useState } from "react";

export const SelectContext = createContext<{
  value: string | string[];
  handleSelect: (selectedValue: string) => void;
  maxChoices?: number | null;
}>({
  value: "",
  handleSelect: () => {},
  maxChoices: 1,
});

/**
 * A container of menu items.
 *
 * @param children Menu items. All items should have thier value set.
 * @param value The value of this controlled input. In this case, the value(s) of the selected menu item(s).
 * @param onChange Called when this controlled input changes.
 * @param maxChoice Limits the number of choices selected. If > 1, checkboxes appear.
 */
const Select: StyleableFC<{
  children: React.ReactNode;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  maxChoices?: number | null;
}> = ({ children, value, onChange, maxChoices = 1, className, style }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /** Set the selected value in the field when an option is selected. */
  function handleSelect(selectedValue: string) {
    onChange(selectedValue);
    setIsMenuOpen(false);
  }

  return (
    <SelectContext.Provider value={{ value, handleSelect, maxChoices }}>
      <div>
        <div
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className={cn(`iex-select flex h-4 border p-32`, className)}
          style={style}
        >
          {value || "เลือก…"}
        </div>

        {isMenuOpen && <Menu className={cn("iex-menu")}>{children}</Menu>}
      </div>
    </SelectContext.Provider>
  );
};

export default Select;
