import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

/**
 * A container of menu items.
 *
 * @param children Menu iterms
 */
const Menu: StyleableFC<{
  children: React.ReactNode;
}> = ({ children, className, style }) => (
  <div
    className={cn(
      `iex-menu bg-brown absolute inset-x-0 z-10 grid max-h-72
      overflow-y-auto py-2 transition-all`,
      className,
    )}
    style={style}
  >
    {children}
  </div>
);

export default Menu;
