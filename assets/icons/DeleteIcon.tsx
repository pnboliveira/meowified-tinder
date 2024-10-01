import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const DeleteIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <Path
      stroke="#E16359"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M24 8 8 24M8 8l16 16"
    />
  </Svg>
);
export default DeleteIcon;
