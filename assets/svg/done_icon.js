import * as React from 'react';
import Svg, {Rect, Path, Defs, LinearGradient, Stop} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={167}
      height={167}
      viewBox="0 0 167 167"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Rect
        x={55.8457}
        y={2.6791}
        width={119.999}
        height={119.999}
        rx={8}
        transform="rotate(26.3 55.846 2.68)"
        fill="url(#paint0_linear_65_1258)"
        stroke="#fff"
        strokeWidth={4}
      />
      <Path
        d="M105.579 70.118l-25.97 27.268-12.984-13.634"
        stroke="#fff"
        strokeWidth={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_65_1258"
          x1={116.938}
          y1={0}
          x2={116.938}
          y2={123.999}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#466AE5" />
          <Stop offset={1} stopColor="#01BEE8" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
