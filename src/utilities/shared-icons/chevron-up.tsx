import Svg, { Path } from 'react-native-svg'

import type { IconSvgProps } from './types'

export const ChevronUpIcon = ({
  strokeWidth = 1.5,
  ...props
}: IconSvgProps) => (
  <Svg
    fill="none"
    focusable={false}
    height="16px"
    role="presentation"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={strokeWidth}
    viewBox="0 0 24 24"
    width="16px"
    {...props}
  >
    <Path d="m18 15-6-6-6 6" />
  </Svg>
)
