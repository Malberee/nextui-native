import { type RNHeroUIProps, mapPropsVariants } from '@/core/system-rsc'
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

interface Props extends RNHeroUIProps {
  /**
   * Ref to the React Native component.
   */
  ref?: Ref<View | null>
  /**
   * Spinner label, in case you passed it will be used as `aria-label`.
   */
  label?: string
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Spinner classNames={{
   *    base:"base-classes",
   *    wrapper: "wrapper-classes",
   *    circle1: "circle1-classes",
   *    circle2: "circle2-classes",
   *    label: "label-classes"
   * }} />
   * ```
   */
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
