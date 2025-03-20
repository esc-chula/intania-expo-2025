"use client";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

/**
 * Field is a box for the user to enter data.
 *
 * @param value The field value
 * @param onChange Function to handle when value changes
 * @param placeholder Placeholder text for the field, transparent on focus
 * @param type Type of field.
 */
const Field: StyleableFC<{
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  type:
    | "date"
    | "datetime-local"
    | "email"
    | "month"
    | "number"
    | "password"
    | "search"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
}> = ({ value, onChange, placeholder, type = "text", className }) => {
  function formatPhone(value: string) {
    const formatted = value.replace(/\D/g, "");

    // Format as "xxx xxx xxxx"
    if (formatted.length <= 3) return formatted;
    if (formatted.length <= 6) return `${formatted.slice(0, 3)} ${formatted.slice(3)}`;
    return `${formatted.slice(0, 3)} ${formatted.slice(3, 6)} ${formatted.slice(6, 10)}`;
  }

  return (
    <input
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={(e) => {
        let newValue: string = e.target.value;
        if (type === "tel") newValue = formatPhone(newValue);
        onChange(newValue);
      }}
      className={cn(
        `iex-field invalid:border-bright-red valid:border-cream 
        h-full w-full border-2 bg-black/40 p-2 focus:placeholder-transparent`,
        className,
      )}
    />
  );
};

export default Field;
