import React from 'react'
import Svg, { Path } from 'react-native-svg'

import type { IconSvgProps } from './types'

export const SelectorIcon = (props: IconSvgProps) => (
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
    <Path d="M0 0h24v24H0z" fill="none" stroke="none" />
    <Path d="M8 9l4 -4l4 4" />
    <Path d="M16 15l-4 4l-4 -4" />
  </Svg>
)
