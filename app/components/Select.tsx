"use client";

import Icon from "@/app/components/Icon";
import Interactive from "@/app/components/Interactive";
import Menu from "@/app/components/Menu";
import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types/misc";
import { toggle } from "radash";
import { createContext, useEffect, useRef, useState } from "react";

/**
 * The Menu will render at the top edge of Select if that edge is beyond this
 * point on the page.
 */
const MAX_POSITION_FOR_BOTTOM = 272;

/** The edge to align Menu to. */
enum ALIGN_EDGE {
  Top,
  Bottom,
}

export const SelectContext = createContext<{
  values: { value: string; label: string }[];
  handleSelect: (value: string, label: string) => void;
  maxChoices?: number | null;
  isMenuOpen: boolean;
}>({
  values: [],
  handleSelect: () => {},
  maxChoices: 1,
  isMenuOpen: false,
});

/**
 * A field that lets the user pick from set choices.
 *
 * @param children Menu items. All items should have thier value set.
 * @param name An identifier for form submission.
 * @param onChange Called when this input changes.
 * @param maxChoice Limits the number of choices selected. If > 1, checkboxes appear.
 */
const Select: StyleableFC<{
  children: React.ReactNode;
  name?: string;
  onChange?: (value: string[]) => void;
  maxChoices?: number | null;
}> = ({ children, name, onChange, maxChoices = 1, className, style }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [alignEdge, setAlignEdge] = useState<ALIGN_EDGE | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    const { top } = ref.current.getBoundingClientRect();
    setAlignEdge(
      top > document.body.clientHeight - MAX_POSITION_FOR_BOTTOM
        ? ALIGN_EDGE.Top
        : ALIGN_EDGE.Bottom,
    );
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [values, setValues] = useState<{ value: string; label: string }[]>([]);

  /** Set the selected value in the field when an option is selected. */
  function handleSelect(selectedValue: string, selectedLabel: string) {
    const value = { value: selectedValue, label: selectedLabel };
    const newValueExists = values.find(
      (_value) => value.value === _value.value,
    );
    // Close the menu when the user has selected the maximum number of choices.
    if (
      maxChoices === 1 ||
      values.length + (newValueExists ? -1 : 1) === maxChoices
    )
      setIsMenuOpen(false);

    let newValues = [];
    // If the user has selected the maximum number of choices and still wants to
    // select another choice, deselect all prior choices.
    if (values.length === maxChoices && !newValueExists) newValues = [value];
    // Otherwise, toggle the selected value.
    else newValues = toggle(values, value, (value) => value.value);

    // Update the selected values.
    setValues(newValues);
    onChange?.(newValues.map((value) => value.value));
  }

  return (
    <SelectContext.Provider
      value={{ values, handleSelect, maxChoices, isMenuOpen }}
    >
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 z-10"
        />
      )}

      <div
        ref={ref}
        className={cn(`iex-select relative`, className)}
        style={style}
      >
        <Interactive
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className={cn(
            `focus-visible:bg-cream border-cream state-layer-white
            focus-visible:state-layer-dark-gray grid w-full
            grid-cols-[auto_1.25rem] items-center gap-2 border-2 bg-black/40
            py-2.5 pr-3 pl-4.5 text-start focus:outline-none`,
            isMenuOpen && `z-20`,
          )}
        >
          <span className="grow truncate">
            {values.length
              ? values.map(({ label }) => label).join(", ")
              : "เลือก…"}
          </span>
          <Icon
            name="arrow_drop_down"
            size={20}
            className={cn(`transition-transform`, isMenuOpen && `-scale-y-100`)}
          />
        </Interactive>

        <Menu
          className={cn(
            alignEdge === null && `hidden`,
            !isMenuOpen && `pointer-events-none opacity-0`,
            !isMenuOpen &&
              (alignEdge === ALIGN_EDGE.Top
                ? `translate-y-2`
                : `-translate-y-2`),
            alignEdge === ALIGN_EDGE.Top ? `bottom-full` : `top-full`,
          )}
        >
          {children}
        </Menu>

        <input
          type="hidden"
          name={name}
          value={values.map(({ value }) => value).join(",")}
        />
      </div>
    </SelectContext.Provider>
  );
};

export default Select;
