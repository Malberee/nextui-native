import Svg, { Path } from 'react-native-svg'

import type { IconSvgProps } from './types'

export const CloseIcon = (
  props: IconSvgProps & {
    // checkbox icon props
    'data-checked'?: string
    'isSelected'?: boolean
    'isIndeterminate'?: boolean
    'disableAnimation'?: boolean
    'className'?: string
  }
) => {
  // avoid passing non-DOM attributes to svg
  const { isSelected, isIndeterminate, disableAnimation, ...otherProps } = props

  return (
    <Svg
      fill="none"
      focusable={false}
      height="16px"
      role="presentation"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width="16px"
      {...otherProps}
    >
      <Path d="M18 6L6 18M6 6l12 12" />
    </Svg>
  )
}
