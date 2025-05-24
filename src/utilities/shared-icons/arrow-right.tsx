import Svg, { Path } from 'react-native-svg'

import type { IconSvgProps } from './types'

export const ArrowRightIcon = ({
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
      d="M16.835 6.91821L23.9166 13.9999L16.835 21.0815"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth={strokeWidth}
    />
    <Path
      d="M4.08325 14H23.7183"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth={strokeWidth}
    />
  </Svg>
)
