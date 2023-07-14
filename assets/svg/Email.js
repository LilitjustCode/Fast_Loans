import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M21 12a9 9 0 10-6.67 8.693"
        stroke="#33363F"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Circle cx={12} cy={12} r={4} stroke="#33363F" strokeWidth={2} />
      <Path
        d="M16 9v4.5a2.5 2.5 0 002.5 2.5v0a2.5 2.5 0 002.5-2.5V12"
        stroke="#33363F"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default SvgComponent;
