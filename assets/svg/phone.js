import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

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
        d="M17.707 13.707l2.648 2.648a.912.912 0 010 1.29 5.471 5.471 0 01-7.151.508l-1.575-1.182a22.996 22.996 0 01-4.6-4.6l-1.182-1.575a5.471 5.471 0 01.508-7.151.912.912 0 011.29 0l2.648 2.648a1 1 0 010 1.414L9.272 8.728a.533.533 0 00-.1.616 12.262 12.262 0 005.484 5.484.533.533 0 00.616-.1l1.02-1.02a1 1 0 011.415 0z"
        stroke="#33363F"
        strokeWidth={2}
      />
    </Svg>
  );
}

export default SvgComponent;
