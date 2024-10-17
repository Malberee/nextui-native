import React from 'react'
import Svg, { Path } from 'react-native-svg'

import type { IconSvgProps } from '../types'

export const ChevronCircleTopLinearIcon = (props: IconSvgProps) => (
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
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="1.5"
    />
    <Path
      d="M8.46997 13.26L12 9.73999L15.53 13.26"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </Svg>
)
