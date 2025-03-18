import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

/**
 * A group of buttons.
 *
 * @param children The buttons.
 */
const Actions: StyleableFC<{
  children: React.ReactNode;
}> = ({ children, className, style }) => (
  <div className={cn(`flex items-center gap-2`, className)} style={style}>
    {children}
  </div>
);

export default Actions;
