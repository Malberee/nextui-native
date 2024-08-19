import type {
  SlotsToClasses,
  SpinnerSlots,
  SpinnerVariantProps,
} from '@/core/theme'
import type { PropsWithChildren, Ref } from 'react'
import type { View } from 'react-native'

interface Props extends PropsWithChildren {
  ref?: Ref<View | null>
  label?: string
  classNames?: SlotsToClasses<SpinnerSlots>
  className?: string
}

export type UseSpinnerProps = Props & SpinnerVariantProps
export interface SpinnerProps extends UseSpinnerProps {}
