import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

const PositionMarker: StyleableFC<{
  children?: React.ReactNode;
  suppressAnimation?: boolean;
}> = ({ children, suppressAnimation, className, style }) => (
  <div
    className={cn(
      `absolute transition-transform duration-5000 *:absolute *:top-0 *:left-0
      *:overflow-visible`,
      className,
    )}
    style={style}
  >
    {/* prettier-ignore */}
    <svg
      width={16} height={16} fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        !suppressAnimation &&
          `motion-safe:animate-[location_5s_var(--ease-standard)_infinite]`,
      )}
    >
      <mask
        id="prefix__a" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse"
        x={0} y={0} width={16} height={16}
      >
        <circle
          opacity={0.4} cx={8} cy={8} r={8}
          fill="url(#prefix__paint0_radial_365_936)"
        />
      </mask>
      <g mask="url(#prefix__a)">
        <circle cx={8} cy={8} r={8} className="fill-yellow" />
      </g>
      <defs>
        <radialGradient
          id="prefix__paint0_radial_365_936" cx={0} cy={0} r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 8 -8 0 8 8)"
        >
          <stop stopColor="#fff" stopOpacity={0} />
          <stop offset={1} stopColor="#fff" />
        </radialGradient>
      </defs>
    </svg>
    {children}
    <svg width={16} height={18} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd" clipRule="evenodd"
        d="M8 18a8 8 0 008-8V8h-.252A8.003 8.003 0 00.252 8H0v2a8 8 0 008 8z"
        className="fill-bright-red"
      />
      <circle
        cx={8} cy={8} r={6.5} className="fill-bright-red stroke-yellow"
        strokeWidth={3}
      />
    </svg>
  </div>
);

export default PositionMarker;
