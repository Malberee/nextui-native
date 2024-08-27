import type { RNNextUIProps } from '@/core/system-rsc'
import type {
  SlotsToClasses,
  ToggleSlots,
  ToggleVariantProps,
} from '@/core/theme'
import type { ReactNode, Ref } from 'react'
import type { View } from 'react-native'

export type SwitchThumbIconProps = {
  isSelected?: boolean
  className?: string
}

interface Props extends RNNextUIProps {
  ref?: Ref<View>
  isSelected?: boolean
  defaultSelected?: boolean
  isReadOnly?: boolean
  children?: ReactNode
  isDisabled?: boolean
  thumbIcon?: ReactNode | ((props: SwitchThumbIconProps) => ReactNode)
  startContent?: ReactNode
  endContent?: ReactNode
  classNames?: SlotsToClasses<ToggleSlots>
  className?: string
  onValueChange?: (value: boolean) => void
}

export type UseSwitchProps = Props & ToggleVariantProps
export interface SwitchProps extends UseSwitchProps {}
