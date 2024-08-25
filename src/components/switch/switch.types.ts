import type {
  SlotsToClasses,
  ToggleSlots,
  ToggleVariantProps,
} from '@/core/theme'
import type { ReactNode, Ref } from 'react'
import type { PressableProps } from 'react-native'

export type SwitchThumbIconProps = {
  isSelected?: boolean
  className?: string
}

interface Props extends PressableProps {
  ref?: Ref<PressableProps>
  value?: boolean
  defaultSelected?: boolean
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
