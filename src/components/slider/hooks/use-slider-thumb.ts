import type { PropGetter, RNNextUIProps } from '@/core/system-rsc'
import type { SliderVariantProps } from '@/core/theme'
import { type ReactRef } from '@/utilities'
import type { AriaSliderThumbProps } from '@react-aria/slider'
import { mergeProps } from '@react-aria/utils'
import { useSliderThumb as useAriaSliderThumb } from '@react-native-aria/slider'
import type { SliderState } from '@react-stately/slider'
import { type RefObject, useRef } from 'react'
import { type View } from 'react-native'

import type { UseSliderProps } from './use-slider'

interface Props extends RNNextUIProps {
  ref?: ReactRef<View | null>
  state: SliderState
  trackRef: RefObject<View>
  trackLayout: {
    width: number
    height: number
  }
  isVertical: boolean
  formatOptions?: Intl.NumberFormatOptions
  renderThumb?: UseSliderProps['renderThumb']
}

export type UseSliderThumbProps = Props &
  AriaSliderThumbProps &
  SliderVariantProps

export const useSliderThumb = (props: UseSliderThumbProps) => {
  const {
    state,
    index = 0,
    name,
    trackLayout,
    className,
    isVertical,
    renderThumb,
    ...otherProps
  } = props

  const inputRef = useRef<View>(null)

  const { thumbProps } = useAriaSliderThumb(
    {
      index,
      trackLayout,
      inputRef,
      name,
      ...otherProps,
    },
    state
  )

  const thumbStyles: any = {
    bottom: isVertical ? `${state.getThumbPercent(index) * 100}%` : undefined,
    left: !isVertical ? `${state.getThumbPercent(index) * 100}%` : '50%',
  }

  const getThumbProps: PropGetter = (props = {}) => {
    return {
      role: 'slider',
      ref: inputRef,
      ...mergeProps(thumbProps, otherProps),
      className,
      style: thumbStyles,
      ...props,
    }
  }

  return {
    index,
    getThumbProps,
    renderThumb,
  }
}
