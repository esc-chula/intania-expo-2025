import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

/**
 * A container of menu items.
 *
 * @param children menu iterms
 */
const Menu: StyleableFC<{
  children: React.ReactNode;
}> = ({ children, className, style }) => (
  <div
    className={cn(
      `iex-menu bg-brown absolute inset-x-0 top-full z-10 grid max-h-72
      overflow-scroll py-2 transition-all`,
      className,
    )}
    style={style}
  >
    {children}
  </div>
);

export default Menu;
