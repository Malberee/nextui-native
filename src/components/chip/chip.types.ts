import type { SlotsToClasses } from '@/core/theme'
import type { ChipSlots, ChipVariantProps } from '@/core/theme/components/chip'
import type { ReactRef } from '@/utilities'
import type { ReactNode } from 'react'
import type { GestureResponderEvent, View, ViewProps } from 'react-native'

export interface UseChipProps extends ViewProps, ChipVariantProps {
  // avatar?: ReactNode
  startContent?: ReactNode
  endContent?: ReactNode
  classNames?: SlotsToClasses<ChipSlots>
  onClose?: (e: GestureResponderEvent) => void
}

export interface ChipProps extends Omit<UseChipProps, 'isOneChar'> {
  ref?: ReactRef<View | null>
}
