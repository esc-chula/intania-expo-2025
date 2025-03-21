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
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?:
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
}> = ({ value, onChange, placeholder, type = "text" }) => {
  /**
   * Handle special behavior for when `type` is `tel`.
   * 
   * Instead of sending the raw value to `onChange`, we format it to
   * `XXX XXX XXXX` first.
   * 
   * @param value The raw value from the Change Event.
   */
  function handleTelChange(value: string) {
    const formatted = value.replace(/\D/g, "");
    if (formatted.length <= 3) return formatted;
    if (formatted.length <= 6)
      return `${formatted.slice(0, 3)} ${formatted.slice(3)}`;
    return `${formatted.slice(0, 3)} ${formatted.slice(3, 6)} ${formatted.slice(6, 10)}`;
  }

  return (
    <input
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={({ target: { value } }) =>
        onChange(type === "tel" ? handleTelChange(value) : value)
      }
      className={cn(`iex-field focus:bg-cream focus:text-dark-gray
        invalid:border-bright-red valid:border-cream block border-2
        bg-black/40 px-4.5 py-2.5 focus:placeholder-transparent
        focus:outline-none`)}
    />
  );
};

export default Field;
