import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={65}
      height={50}
      viewBox="0 0 65 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Rect width={65} height={50} rx={10} fill="#466AE5" />
      <Path
        d="M34.06 13.94a1.5 1.5 0 00-2.12 0l-9.547 9.545a1.5 1.5 0 102.122 2.122L33 17.12l8.485 8.486a1.5 1.5 0 102.122-2.122L34.06 13.94zM34.5 35V15h-3v20h3z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
