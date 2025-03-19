/**
 * Form Item displays the form label and corresponding input field.
 *
 * @param children The input field (Field/Select), displays on the right.
 * @param label The form label, displays on the left.
 *
 */

export default function FormItem({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="mx-4 my-3 flex h-13 items-center justify-between text-white">
      <span className="w-3/10 self-center pr-5 text-right text-title-md font-semibold italic">
        {label}
      </span>
      <div className="grow self-center content-center h-full">{children}</div>
    </div>
  );
}
