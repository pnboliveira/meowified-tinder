import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const HeartIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <Path
      fill="#6BD88E"
      stroke="#6BD88E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M27.787 6.147a7.333 7.333 0 0 0-10.374 0L16 7.56l-1.413-1.413A7.335 7.335 0 0 0 4.213 16.52l1.414 1.413L16 28.307l10.373-10.374 1.414-1.413a7.333 7.333 0 0 0 0-10.373Z"
    />
  </Svg>
);
export default HeartIcon;
