import Svg, { Path } from 'react-native-svg'

import type { IconSvgProps } from './types'

export const ChevronIcon = (props: IconSvgProps) => (
  <Svg
    fill="none"
    focusable={false}
    height="16px"
    role="presentation"
    viewBox="0 0 24 24"
    width="16px"
    {...props}
  >
    <Path
      d="M15.5 19l-7-7 7-7"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </Svg>
)
