import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle cx={12} cy={12} r={9} stroke="#33363F" strokeWidth={2} />
      <Path d="M7.5 12h9" stroke="#33363F" strokeWidth={2} />
    </Svg>
  );
}

export default SvgComponent;
