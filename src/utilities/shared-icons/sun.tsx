import Svg, { Circle, Path } from 'react-native-svg'

import type { IconSvgProps } from './types'

export const SunIcon = (props: IconSvgProps) => (
  <Svg
    focusable={false}
    height="16px"
    role="presentation"
    viewBox="0 0 512 512"
    width="16px"
    {...props}
  >
    <Path
      d="M256 48v48M256 416v48M403.08 108.92l-33.94 33.94M142.86 369.14l-33.94 33.94M464 256h-48M96 256H48M403.08 403.08l-33.94-33.94M142.86 142.86l-33.94-33.94"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeMiterlimit={10}
      strokeWidth={32}
    />
    <Circle
      cx={256}
      cy={256}
      fill="none"
      r={80}
      stroke="currentColor"
      strokeLinecap="round"
      strokeMiterlimit={10}
      strokeWidth={32}
    />
  </Svg>
)
