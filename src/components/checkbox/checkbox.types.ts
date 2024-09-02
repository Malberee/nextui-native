import type { RNNextUIProps } from '@/core/system-rsc'
import type {
  CheckboxSlots,
  CheckboxVariantProps,
  SlotsToClasses,
} from '@/core/theme'
import '@react-native-aria/checkbox'
import type { AriaCheckboxProps } from '@react-types/checkbox'
import type { ReactNode, Ref } from 'react'
import type { View } from 'react-native'

import type { useCheckbox } from './hooks/use-checkbox'

export type CheckboxIconProps = {
  isSelected: boolean
  isIndeterminate: boolean
  disableAnimation: boolean
  className: string
}

interface Props extends Omit<RNNextUIProps, keyof CheckboxVariantProps> {
  ref?: Ref<View>
  children?: ReactNode
  isDisabled?: boolean
  isRequired?: boolean
  isReadOnly?: boolean
  isSelected?: boolean
  isIndeterminate?: boolean
  defaultSelected?: boolean
  icon?: ReactNode | ((props: CheckboxIconProps) => ReactNode)
  onValueChange?: AriaCheckboxProps['onChange']
  classNames?: SlotsToClasses<CheckboxSlots>
  className?: string
}

export type UseCheckboxProps = Omit<Props, 'defaultChecked'> &
  Omit<AriaCheckboxProps, keyof CheckboxVariantProps | 'onChange'> &
  CheckboxVariantProps
export interface CheckboxProps extends UseCheckboxProps {}
export type UseCheckboxReturn = ReturnType<typeof useCheckbox>
