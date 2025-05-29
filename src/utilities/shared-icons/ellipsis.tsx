import Svg, { Circle } from 'react-native-svg'

import type { IconSvgProps } from './types'

export const EllipsisIcon = (props: IconSvgProps) => (
  <Svg
    fill="none"
    height="16px"
    // shapeRendering="geometricPrecision"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    width="16px"
    {...props}
  >
    <Circle cx="12" cy="12" fill="currentColor" r="1" />
    <Circle cx="19" cy="12" fill="currentColor" r="1" />
    <Circle cx="5" cy="12" fill="currentColor" r="1" />
  </Svg>
)
