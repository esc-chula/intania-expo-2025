import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

/**
 * Form Item displays the form label and corresponding input field.
 *
 * @param children The input field (Field/Select), displays on the right.
 * @param label The form label, displays on the left.
 */
const FormItem: StyleableFC<{
  children: React.ReactNode;
  label: string;
}> = ({ children, label, className, style }) => (
  <div
    className={cn(
      `iex-form-item grid grid-cols-4 items-center justify-between gap-4 px-4
      [&_.iex-field]:col-span-3`,
      className,
    )}
    style={style}
  >
    <label
      className={cn(`text-title-md leading-title-md text-right font-semibold
        text-white italic`)}
    >
      {label}
    </label>
    {children}
  </div>
);

export default FormItem;
