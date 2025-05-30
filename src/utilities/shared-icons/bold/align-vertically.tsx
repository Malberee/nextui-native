import Svg, { Path } from 'react-native-svg'

import type { IconSvgProps } from '../types'

export const AlignVerticallyBoldIcon = (props: IconSvgProps) => (
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
      d="M17.4 19.25H6.6C5.1 19.25 4.5 18.61 4.5 17.02V15.98C4.5 14.39 5.1 13.75 6.6 13.75H17.4C18.9 13.75 19.5 14.39 19.5 15.98V17.02C19.5 18.61 18.9 19.25 17.4 19.25Z"
      fill="currentColor"
    />
    <Path
      d="M12.75 19.25V21.25C12.75 21.66 12.41 22 12 22C11.59 22 11.25 21.66 11.25 21.25V19.25H12.75Z"
      fill="currentColor"
    />
    <Path d="M12.75 10.75H11.25V13.75H12.75V10.75Z" fill="currentColor" />
    <Path
      d="M12.75 2.75V5.25H11.25V2.75C11.25 2.34 11.59 2 12 2C12.41 2 12.75 2.34 12.75 2.75Z"
      fill="currentColor"
    />
    <Path
      d="M15.4 10.75H8.6C7.1 10.75 6.5 10.11 6.5 8.52V7.48C6.5 5.89 7.1 5.25 8.6 5.25H15.4C16.9 5.25 17.5 5.89 17.5 7.48V8.52C17.5 10.11 16.9 10.75 15.4 10.75Z"
      fill="currentColor"
    />
  </Svg>
)
