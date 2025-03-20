import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

/**
 * Form Item displays the form label and corresponding input field.
 *
 * @param children The input field (Field/Select), displays on the right.
 * @param label The form label, displays on the left.
 *
 */

const FormItem: StyleableFC<{
  children: React.ReactNode;
  label: string;
}> = ({ children, label, className, style }) => (
  <div
    className={cn(
      `iex-form-item mx-4 my-3 grid h-12 grid-cols-3 items-center text-white`,
      className,
    )}
    style={style}
  >
    <label
      className={cn(
        `text-title-md leading-title-md col-span-1 self-center pr-5 
        text-right font-bold tracking-wide italic`,
      )}
    >
      {label}
    </label>
    <div className="col-span-2 h-full self-center">{children}</div>
  </div>
);

export default FormItem;
