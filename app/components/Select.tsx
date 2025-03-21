"use client";
import React, { createContext } from "react";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import { useState } from "react";
import Menu from "@/app/components/Menu";

/**
 * A container of menu items.
 *
 * @param children Menu items. All items should have thier value set.
 * @param value The value of this controlled input. In this case, the value(s) of the selected menu item(s).
 * @param onChange Called when this controlled input changes.
 * @param maxChoice Limits the number of choices selected. If > 1, checkboxes appear.
 */
interface SelectContextType {
  value: string | string[];
  handleSelect: (selectedValue: string) => void;
  maxChoices?: number | null;
}

const SelectContext = createContext<SelectContextType>({
  value: "",
  handleSelect: () => {},
  maxChoices: 1,
});

const Select: StyleableFC<{
  children: React.ReactNode;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  maxChoices?: number | null;
}> = ({ children, value, onChange, maxChoices = 1, className, style }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSelect = (selectedValue: string) => {
    // set the selected value in the field when an option is selected.
    onChange(selectedValue);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <SelectContext.Provider value={{ value, handleSelect, maxChoices }}>
      <div>
        <div
          onClick={toggleMenu}
          className={cn("iex-select flex h-4 border p-32", className)}
          style={style}
        >
          {value || "select an option"}
        </div>

        {isMenuOpen && <Menu className={cn("iex-menu")}>{children}</Menu>}
      </div>
    </SelectContext.Provider>
  );
};

export { SelectContext };
export default Select;
