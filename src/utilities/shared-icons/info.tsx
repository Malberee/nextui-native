import React from 'react'
import Svg, { Path } from 'react-native-svg'

import type { IconSvgProps } from './types'

export const InfoIcon = (props: IconSvgProps) => (
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
      d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <Path
      d="M12 8V13"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <Path
      d="M11.9945 16H12.0035"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </Svg>
)
