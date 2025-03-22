"use client";

import Interactive from "@/app/components/Interactive";
import Menu from "@/app/components/Menu";
import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types/misc";
import { toggle } from "radash";
import { createContext, useState } from "react";

export const SelectContext = createContext<{
  value: string[];
  handleSelect: (value: string, label: string) => void;
  maxChoices?: number | null;
  isMenuOpen: boolean;
}>({
  value: [],
  handleSelect: () => {},
  maxChoices: 1,
  isMenuOpen: false,
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
  value: string[];
  onChange: (value: string[]) => void;
  maxChoices?: number | null;
}> = ({ children, value, onChange, maxChoices = 1, className, style }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  /** Set the selected value in the field when an option is selected. */
  function handleSelect(selectedValue: string, selectedLabel: string) {
    // Close the menu when the user has selected the maximum number of choices.
    if (
      maxChoices !== null ||
      maxChoices === 1 ||
      value.length + (value.includes(selectedValue) ? -1 : 1) === maxChoices
    )
      setIsMenuOpen(false);
    // If the user has selected the maximum number of choices and still wants to
    // select another choice, deselect all prior choices.
    if (value.length === maxChoices) {
      onChange([selectedValue]);
      setSelectedLabels([selectedLabel]);
    } // Otherwise, toggle the selected value.
    else {
      onChange(toggle(value, selectedValue));
      setSelectedLabels((prev) => toggle(prev, selectedLabel));
    }
  }

  return (
    <SelectContext.Provider
      value={{ value, handleSelect, maxChoices, isMenuOpen }}
    >
      <div className="iex-select relative">
        <Interactive
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className={cn(
            `focus-visible:bg-cream valid:border-cream state-layer-white
            focus-visible:state-layer-dark-gray block w-full truncate border-2
            bg-black/40 px-4.5 py-2.5 text-start focus:outline-none`,
            className,
          )}
          style={style}
        >
          <span>
            {selectedLabels.length ? selectedLabels.join(", ") : "เลือก…"}
          </span>
        </Interactive>

        <Menu className={cn(!isMenuOpen && `hidden`)}>{children}</Menu>
      </div>
    </SelectContext.Provider>
  );
};

export default Select;
