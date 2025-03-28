import { StyleableFC } from "@/lib/types/misc";

const HeadingMarker: StyleableFC = ({ className, style }) =>
  // prettier-ignore
  <svg
  width={16}
  height={16}
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  className={className}
  style={style}
>
  <mask
    id="prefix__b" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse"
    x={0} y={0} width={16} height={16}
  >
    <circle
      cx={8} cy={8} r={8}
      fill="url(#prefix__paint0_radial_1553_5169)"
    />
  </mask>
  <g mask="url(#prefix__b)">
    <path
      d="M3.411 1.447a8 8 0 019.404.164L8 8 3.411 1.447z"
      className="fill-yellow"
    />
  </g>
  <defs>
    <radialGradient
      id="prefix__paint0_radial_1553_5169" cx={0} cy={0} r={1}
      gradientUnits="userSpaceOnUse"
      gradientTransform="matrix(0 8 -8 0 8 8)"
    >
      <stop stopColor="#fff" />
      <stop offset={1} stopColor="#fff" stopOpacity={0} />
    </radialGradient>
  </defs>
</svg>;

export default HeadingMarker;
