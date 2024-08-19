import { useProviderContext } from '@/core'
import { mapPropsVariants } from '@/core/system-rsc'
import { buttonGroup } from '@/core/theme'
import { objectToDeps } from '@/utilities'
import { useMemo } from 'react'

import type { ButtonGroupProps, ContextType } from '../button.types'

export const useButtonGroup = (originalProps: ButtonGroupProps) => {
  const globalContext = useProviderContext()
  const [props, variantProps] = mapPropsVariants(
    originalProps,
    buttonGroup.variantKeys
  )

  const {
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

  return {
    context,
    classNames,
    ...otherProps,
  }
}
