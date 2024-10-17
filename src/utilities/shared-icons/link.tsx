import React from 'react'
import Svg, { Path } from 'react-native-svg'

import type { IconSvgProps } from './types'

export const LinkIcon = (props: IconSvgProps) => (
  <Svg
    fill="none"
    focusable={false}
    height="16px"
    // shapeRendering="geometricPrecision"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    width="16px"
    {...props}
  >
    <Path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <Path d="M15 3h6v6" />
    <Path d="M10 14L21 3" />
  </Svg>
)
