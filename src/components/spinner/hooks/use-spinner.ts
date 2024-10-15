import { type RNNextUIProps, mapPropsVariants } from '@/core/system-rsc'
import {
  type SlotsToClasses,
  type SpinnerSlots,
  type SpinnerVariantProps,
  spinner,
} from '@/core/theme'
import { objectToDeps } from '@/utilities'
import clsx from 'clsx'
import { type Ref, useMemo } from 'react'
import type { View } from 'react-native'

interface Props extends RNNextUIProps {
  ref?: Ref<View | null>
  label?: string
  classNames?: SlotsToClasses<SpinnerSlots>
  className?: string
}

export type UseSpinnerProps = Props & SpinnerVariantProps

export const useSpinner = (originalProps: Omit<UseSpinnerProps, 'ref'>) => {
  const [props, variantProps] = mapPropsVariants(
    originalProps,
    spinner.variantKeys
  )

  const {
    children,
    className,
    classNames,
    label: labelProp,
    ...otherProps
  } = props

  const slots = useMemo(
    () => spinner({ ...variantProps }),
    [objectToDeps(variantProps)]
  )

  const baseStyles = clsx(classNames?.base, className)

  const label = labelProp || children

  const getSpinnerProps = () => ({
    className: slots.base({ class: baseStyles }),
    ...otherProps,
  })

  return {
    size: originalProps.size || 'md',
    label,
    slots,
    classNames,
    getSpinnerProps,
  }
}
