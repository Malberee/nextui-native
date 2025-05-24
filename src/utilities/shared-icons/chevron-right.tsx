import Svg, { Path } from 'react-native-svg'

import type { IconSvgProps } from './types'

export const ChevronRightIcon = (props: IconSvgProps) => (
  <Svg
    fill="none"
    focusable={false}
    height="16px"
    role="presentation"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    width="16px"
    {...props}
  >
    <Path d="m9 18 6-6-6-6" />
  </Svg>
)
