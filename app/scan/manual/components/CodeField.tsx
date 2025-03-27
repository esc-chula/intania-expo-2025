"use client";

import CodeDigitBox from "@/app/scan/manual/components/CodeDigitBox";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import { list } from "radash";

/**
 * A field for entering a six-digit code.
 * 
 * @param ref A reference to the input element.
 * @param value The value of this controlled input.
 * @param loading Whether the input is loading.
 * @param onChange Called when this controlled input changes.
 */
const CodeField: StyleableFC<{
  ref: React.RefObject<HTMLInputElement | null>;
  value: string;
  loading?: boolean;
  onChange: (value: string) => void;
}> = ({ ref, value, loading, onChange, className, style }) => {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    if (value.length === 1) onChange(value.toUpperCase() + `-`);
    else if (value.length > 1)
      onChange(value[0] + "-" + value.slice(2).replace(/\D/g, ""));
  }

  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    if (
      (event.key === "Backspace" && value.length === 2) ||
      event.key === "Escape"
    )
      onChange("");
  }

  return (
    <label
      className={cn(
        `text-headline-sm relative flex items-center justify-center gap-2`,
        className,
      )}
      style={style}
    >
      <CodeDigitBox digit={value[0]} loading={loading} />
      <span>-</span>
      {list(2, 6).map((index) => (
        <CodeDigitBox key={index} digit={value[index]} loading={loading} />
      ))}
      <input
        ref={ref}
        type="text"
        pattern="[SICTO]-\d{5}"
        maxLength={7}
        value={value}
        disabled={loading}
        autoFocus
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        className="sr-only"
      />
    </label>
  );
};

export default CodeField;
