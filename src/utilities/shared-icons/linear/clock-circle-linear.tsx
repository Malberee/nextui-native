import React from 'react'
import Svg, { Circle, G, Path } from 'react-native-svg'

import type { IconSvgProps } from '../types'

export const ClockCircleLinearIcon = (props: IconSvgProps) => (
  <Svg
    fill="none"
    focusable={false}
    height="16px"
    role="presentation"
    viewBox="0 0 24 24"
    width="16px"
    {...props}
  >
    <G fill="none" stroke="currentColor" strokeWidth="1.5">
      <Circle cx="12" cy="12" r="10" />
      <Path d="M12 8v4l2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
    </G>
  </Svg>
)
