import React from 'react'
import Svg, { Path } from 'react-native-svg'

import type { IconSvgProps } from './types'

export const ForwardIcon = (props: IconSvgProps) => (
  <Svg
    fill="none"
    focusable={false}
    height="16px"
    role="presentation"
    // shapeRendering="geometricPrecision"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    width="16px"
    {...props}
  >
    <Path d="M13 17l5-5-5-5" />
    <Path d="M6 17l5-5-5-5" />
  </Svg>
)
