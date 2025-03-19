"use client"
import cn from "@/lib/helpers/cn";

/**
 * Field is a box for the user to enter data.
 * 
 * @param value The field value
 * @param onChange Function to handle when value changes
 * @param placeholder Placeholder text for the field, transparent on focus
 * @param type Type of field.
 */
export default function Field({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string | number;
  onChange: Function;
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
}) {
  function formatPhone(value: string) {
    const cleaned = value.replace(/\D/g, "");

    // Format as "xxx xxx xxxx"
    if (cleaned.length <= 3) {
      console.log(cleaned);
      return cleaned;
    } else if (cleaned.length <= 6) {
      console.log(cleaned);
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    } else {
      console.log(cleaned);
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 10)}`;
    }
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
        "iex-field invalid:border-bright-red valid:border-cream ",
        "h-full w-full border-2 bg-black/40 p-2 focus:placeholder-transparent",
      )}
    />
  );
}