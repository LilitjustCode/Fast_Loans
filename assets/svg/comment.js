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
        d="M12 12a1 1 0 100-2 1 1 0 000 2zM16 12a1 1 0 100-2 1 1 0 000 2zM8 12a1 1 0 100-2 1 1 0 000 2z"
        fill="#000"
      />
      <Path
        d="M19 3H5a3 3 0 00-3 3v15a1 1 0 001.51.86L8 19.14a1 1 0 01.55-.14H19a3 3 0 003-3V6a3 3 0 00-3-3zm1 13a1 1 0 01-1 1H8.55a3 3 0 00-1.55.43l-3 1.8V6a1 1 0 011-1h14a1 1 0 011 1v10z"
        fill="#000"
      />
    </Svg>
  );
}

export default SvgComponent;
