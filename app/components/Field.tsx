import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import type { ComponentProps } from "react";

/**
 * Field is a box for the user to enter data.
 *
 * @param value The field value
 * @param onChange Function to handle when value changes
 * @param placeholder Placeholder text for the field, transparent on focus
 * @param type Type of field.
 */
const Field: StyleableFC<
  {
    value?: string;
    onChange?: (value: string) => void;
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
  } & Omit<ComponentProps<"input">, "value" | "onChange" | "type">
> = ({ value, onChange, type = "text", ...props }) => (
  <input
    {...props}
    value={value}
    type={type}
    onChange={(event) => onChange?.(event.target.value)}
    className={cn(`iex-field focus:bg-cream focus:text-dark-gray
      [:user-invalid]:border-bright-red border-cream [:user-invalid]:text-white
      focus:[:user-invalid]:bg-bright-red block border-2 bg-black/40 px-4.5
      py-2.5 focus:placeholder-transparent focus:outline-none`)}
  />
);

export default Field;
