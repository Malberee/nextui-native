import type { Color, Radius, Size, Variant } from '@/types'
import type { ReactRef } from '@/utilities'
import type { ReactElement, ReactNode } from 'react'
import type { PressableProps, View } from 'react-native'

export interface ButtonProps extends PressableProps {
  ref?: ReactRef<View | null>
  children?: ReactNode
  variant?: Variant
  color?: Color
  size?: Size
  radius?: Radius
  startContent?: ReactNode
  endContent?: ReactNode
  spinner?: ReactNode
  spinnerPlacement?: 'start' | 'end'
  fullWidth?: boolean
  isIconOnly?: boolean
  isDisabled?: boolean
  isLoading?: boolean
  disableRipple?: boolean
  disableAnimation?: boolean
  classNames?: {
    base?: string
    content?: string
  }
}

export interface ButtonGroupProps
  extends Pick<
    ButtonProps,
    | 'size'
    | 'color'
    | 'radius'
    | 'variant'
    | 'isIconOnly'
    | 'isDisabled'
    | 'disableAnimation'
    | 'disableRipple'
    | 'fullWidth'
  > {
  children: ReactElement<ButtonProps> | ReactElement<ButtonProps>[]
  className?: string
}

export interface ContextType {
  size?: ButtonProps['size']
  color?: ButtonProps['color']
  variant?: ButtonProps['variant']
  radius?: ButtonProps['radius']
  isDisabled?: ButtonProps['isDisabled']
  disableAnimation?: ButtonProps['disableAnimation']
  disableRipple?: ButtonProps['disableRipple']
  isIconOnly?: ButtonProps['isIconOnly']
  fullWidth?: boolean
}
