import Svg, { Path } from 'react-native-svg'

import type { IconSvgProps } from './types'

export const ArrowLeftIcon = ({
  strokeWidth = 1.5,
  ...otherProps
}: IconSvgProps) => (
  <Svg
    fill="none"
    focusable={false}
    height="16px"
    role="presentation"
    viewBox="0 0 24 24"
    width="16px"
    {...otherProps}
  >
    <Path
      d="M9.57 5.92993L3.5 11.9999L9.57 18.0699"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth={strokeWidth}
    />
    <Path
      d="M20.5 12H3.67004"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth={strokeWidth}
    />
  </Svg>
)
