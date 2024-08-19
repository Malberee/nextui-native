import { useRipple } from '@/components/ripple'
import type { SpinnerProps } from '@/components/spinner/spinner.types'
import { useProviderContext } from '@/core'
import { button } from '@/core/theme'
import { useRippleColor } from '@/core/theme/hooks/useRippleColor'
import { combineHandlers } from '@/utilities'
import { useCallback, useMemo, useState } from 'react'
import type { LayoutChangeEvent } from 'react-native'

import { useButtonGroupContext } from '../button-group-context'
import type { ButtonProps } from '../button.types'

export const useButton = (props: Omit<ButtonProps, 'ref'>) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const groupContext = useButtonGroupContext()
  const globalContext = useProviderContext()

  const {
    variant = groupContext?.variant ?? 'solid',
    color = groupContext?.color ?? 'primary',
    size = groupContext?.size ?? 'md',
    radius = groupContext?.radius ?? 'md',
    fullWidth = groupContext?.fullWidth ?? false,
    isDisabled: isDisabledProp = groupContext?.isDisabled ?? false,
    isLoading = false,
    isIconOnly = groupContext?.isIconOnly ?? false,
    disableAnimation = groupContext?.disableAnimation ??
      globalContext?.disableAnimation ??
      false,
    disableRipple: disableRippleProp,
    className,
    classNames,
    spinnerPlacement = 'start',
    onPress: onPressOriginal,
    ...rest
  } = props

  const isDisabled = isDisabledProp || isLoading
  const disableRipple =
    (disableRippleProp || globalContext?.disableRipple) ?? disableAnimation

  const slots = useMemo(
    () =>
      button({
        size,
        color,
        variant,
        radius,
        fullWidth,
        isDisabled,
        disableAnimation,
        isIconOnly,
        className,
      }),
    [
      size,
      color,
      variant,
      radius,
      fullWidth,
      isDisabled,
      isIconOnly,
      disableAnimation,
      className,
    ]
  )

  const {
    onClear: onClearRipple,
    ripples,
    onPress: onPressRiple,
  } = useRipple(Math.max(dimensions.width, dimensions.height))

  const rippleColor = useRippleColor(variant, color)

  const getRippleProps = useCallback(
    () => ({ ripples, onClear: onClearRipple, color: rippleColor }),
    [ripples, onClearRipple]
  )

  const onPress = combineHandlers(
    disableRipple ? () => {} : onPressRiple,
    onPressOriginal
  )

  const spinnerSize = useMemo(() => {
    const buttonSpinnerSizeMap: Record<string, SpinnerProps['size']> = {
      sm: 'sm',
      md: 'sm',
      lg: 'md',
    }

    return buttonSpinnerSizeMap[size]
  }, [size])

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout

    setDimensions({ width, height })
  }

  return {
    slots,
    classNames,
    isLoading,
    isIconOnly,
    isDisabled,
    spinnerSize,
    spinnerPlacement,
    disableRipple,
    getRippleProps,
    onPress,
    onLayout,
    ...rest,
  }
}
