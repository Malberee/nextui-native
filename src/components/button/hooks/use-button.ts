import { useRipple } from '@/components/ripple'
import type { SpinnerProps } from '@/components/spinner/spinner.types'
import { useProviderContext } from '@/core'
import type { PropGetter, RNNextUIProps } from '@/core/system-rsc'
import {
  type ButtonSlots,
  type ButtonVariantProps,
  type SlotsToClasses,
  button,
} from '@/core/theme'
import { useRippleColor } from '@/core/theme/hooks/useRippleColor'
import type { ReactRef } from '@/utilities'
import { chain, mergeProps } from '@react-aria/utils'
import {
  type AriaButtonProps,
  useButton as useAriaButton,
} from '@react-native-aria/button'
import {
  type ReactNode,
  cloneElement,
  isValidElement,
  useCallback,
  useMemo,
  useState,
} from 'react'
import type { LayoutChangeEvent, View } from 'react-native'

import { useButtonGroupContext } from '../button-group-context'

interface Props extends RNNextUIProps {
  ref?: ReactRef<View | null>
  disableRipple?: boolean
  startContent?: ReactNode
  endContent?: ReactNode
  spinner?: ReactNode
  spinnerPlacement?: 'start' | 'end'
  isLoading?: boolean
  classNames?: SlotsToClasses<ButtonSlots>
  className?: string
}

export type UseButtonProps = Props &
  Omit<AriaButtonProps, keyof ButtonVariantProps> &
  Omit<ButtonVariantProps, 'isinGroup'>

export const useButton = (props: UseButtonProps) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const groupContext = useButtonGroupContext()
  const globalContext = useProviderContext()

  const {
    ref,
    children,
    startContent: startContentProp,
    endContent: endContentProp,
    className,
    classNames,
    spinner,
    isLoading = false,
    disableRipple: disableRippleProp,
    fullWidth = groupContext?.fullWidth ?? false,
    radius = groupContext?.radius ?? 'md',
    size = groupContext?.size ?? 'md',
    color = groupContext?.color ?? 'primary',
    variant = groupContext?.variant ?? 'solid',
    disableAnimation = groupContext?.disableAnimation ??
      globalContext?.disableAnimation ??
      false,
    isDisabled: isDisabledProp = groupContext?.isDisabled ?? false,
    isIconOnly = groupContext?.isIconOnly ?? false,
    spinnerPlacement = 'start',
    onPress,
    ...otherProps
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
  } = useRipple(dimensions.width, dimensions.height)

  const rippleColor = useRippleColor(variant, color)

  const getRippleProps = useCallback(
    () => ({ ripples, onClear: onClearRipple, color: rippleColor }),
    [ripples, onClearRipple]
  )

  const { buttonProps: ariaButtonProps } = useAriaButton({
    isDisabled,
    onPress: chain(disableRipple ? () => {} : onPressRiple, onPress),
    ...otherProps,
  })

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout

    setDimensions({ width, height })
  }

  const getButtonProps: PropGetter = useCallback(
    (props = {}) => ({
      ref,
      className: slots.base({ class: classNames?.base }),
      onLayout,
      ...mergeProps(ariaButtonProps, props, otherProps),
    }),
    [slots, classNames?.base, className, otherProps]
  )

  const getIconClone = (icon: ReactNode) =>
    isValidElement(icon) ? cloneElement(icon) : null

  const startContent = getIconClone(startContentProp)
  const endContent = getIconClone(endContentProp)

  const spinnerSize = useMemo(() => {
    const buttonSpinnerSizeMap: Record<string, SpinnerProps['size']> = {
      sm: 'sm',
      md: 'sm',
      lg: 'md',
    }

    return buttonSpinnerSizeMap[size]
  }, [size])

  return {
    children,
    startContent,
    endContent,
    spinner,
    slots,
    classNames,
    isLoading,
    isIconOnly,
    isDisabled,
    spinnerSize,
    spinnerPlacement,
    disableRipple,
    getRippleProps,
    getButtonProps,
  }
}
