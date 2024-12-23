import { useProviderContext } from '@/core'
import {
  type PropGetter,
  type RNNextUIProps,
  mapPropsVariants,
} from '@/core/system-rsc'
import { type ButtonGroupVariantProps, buttonGroup } from '@/core/theme'
import { type ReactRef, objectToDeps, useNativeRef } from '@/utilities'
import { useCallback, useMemo } from 'react'
import type { View } from 'react-native'

import type { ButtonProps } from '../index'

interface Props extends RNNextUIProps, ButtonGroupVariantProps {
  /**
   * Ref to the React Native component.
   */
  ref?: ReactRef<View | null>
  /**
   * Whether the buttons are disabled.
   * @default false
   */
  isDisabled?: ButtonProps['isDisabled']
  className: string
}

export type ContextType = {
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

export type UseButtonGroupProps = Props &
  Partial<
    Pick<
      ButtonProps,
      | 'size'
      | 'color'
      | 'radius'
      | 'variant'
      | 'isIconOnly'
      | 'disableAnimation'
      | 'disableRipple'
    >
  >

export const useButtonGroup = (originalProps: UseButtonGroupProps) => {
  const globalContext = useProviderContext()
  const [props, variantProps] = mapPropsVariants(
    originalProps,
    buttonGroup.variantKeys
  )

  const {
    ref,
    children,
    color = 'default',
    size = 'md',
    variant = 'solid',
    radius,
    isDisabled = false,
    isIconOnly = false,
    disableRipple = globalContext?.disableRipple ?? false,
    disableAnimation = globalContext?.disableAnimation ?? false,
    className,
    ...otherProps
  } = props

  const baseRef = useNativeRef(ref)

  const classNames = useMemo(
    () =>
      buttonGroup({
        ...variantProps,
        className,
      }),
    [objectToDeps(variantProps), className]
  )

  const context = useMemo<ContextType>(
    () => ({
      size,
      color,
      variant,
      radius,
      isIconOnly,
      isDisabled,
      disableAnimation,
      disableRipple,
      fullWidth: !!originalProps?.fullWidth,
    }),
    [
      size,
      color,
      variant,
      radius,
      isDisabled,
      isIconOnly,
      disableAnimation,
      disableRipple,
      originalProps?.fullWidth,
    ]
  )

  const getButtonGroupProps: PropGetter = useCallback(() => {
    return {
      role: 'group',
      ...otherProps,
    }
  }, [otherProps])

  return {
    children,
    baseRef,
    context,
    classNames,
    getButtonGroupProps,
  }
}
