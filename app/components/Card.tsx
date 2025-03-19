/**
 * A simple brown box.
 *
 * @param children Content which will be displayed inside the Card.
 * @param className Additional classes other than given base.
 */

import cn from "@/lib/helpers/cn";

export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("bg-brown mx-4 flex p-2 ", className)}>{children}</div>
  );
}
