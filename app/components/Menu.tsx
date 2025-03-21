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
    className={cn(`iex-menu flex-col items-center justify-center`, className)}
    style={style}
  >
    {children}
  </div>
);

export default Menu;
