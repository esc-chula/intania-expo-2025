import cn from "@/lib/helpers/cn";

/**
 * A simple brown box.
 *
 * @param children Content which will be displayed inside the Card.
 * @param className Additional styling classes other than the given base.
 */
export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("bg-brown mx-4 flex p-2", className)}>{children}</div>
  );
}
