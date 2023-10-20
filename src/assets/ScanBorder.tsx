import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';

const SvgComponent = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={261}
    height={261}
    fill="none"
    {...props}>
    <Path
      fill="#D9D9D9"
      fillRule="evenodd"
      d="M206 3h-17V0h17c30.376 0 55 24.624 55 55v17h-3V55c0-28.719-23.281-52-52-52Zm52 186h3v17c0 30.376-24.624 55-55 55h-17v-3h17c28.719 0 52-23.281 52-52v-17ZM72 258H55c-28.719 0-52-23.281-52-52v-17H0v17c0 30.376 24.624 55 55 55h17v-3ZM0 76h3V55C3 26.281 26.281 3 55 3h17V0H55C24.624 0 0 24.624 0 55v21Z"
      clipRule="evenodd"
    />
  </Svg>
);
const ScanBorder = memo(SvgComponent);
export default ScanBorder;
