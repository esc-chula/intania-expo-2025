import { FC } from "react";

/**
 * A function component stylable through `className` and `style`.
 */
export type StylableFC<Props extends object = object> = FC<
  Props & { className?: string; style?: React.CSSProperties }
>;
