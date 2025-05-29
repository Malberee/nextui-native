import Svg, { Polyline } from 'react-native-svg'

import type { IconSvgProps } from '../types'

export const CheckLinearIcon = (props: IconSvgProps) => (
  <Svg
    fill="none"
    focusable={false}
    height="16px"
    role="presentation"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
    width="16px"
    {...props}
  >
    <Polyline points="20 6 9 17 4 12" />
  </Svg>
)
