import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

/**
 * A simple brown box.
 *
 * @param children The card’s content.
 */
const Card: StyleableFC<{
  children: React.ReactNode;
}> = ({ children, className, style }) => (
  <div className={cn(`iex-card bg-brown text-white`, className)} style={style}>
    {children}
  </div>
);

export default Card;
