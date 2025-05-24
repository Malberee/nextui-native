import { useProviderContext } from '@/core'
import {
  type PropGetter,
  type RNNextUIProps,
  mapPropsVariants,
} from '@/core/system-rsc'
import {
  type ProgressSlots,
  type ProgressVariantProps,
  type SlotsToClasses,
  progress,
} from '@/core/theme'
import { useIsMounted } from '@/hooks'
import {
  type ReactRef,
  clampPercentage,
  objectToDeps,
  useNativeRef,
} from '@/utilities'
import { chain, mergeProps } from '@react-aria/utils'
import type { AriaProgressBarProps } from '@react-types/progress'
import clsx from 'clsx'
import { useCallback, useMemo, useState } from 'react'
import { Dimensions, type LayoutChangeEvent, type View } from 'react-native'

import { useIndeterminateAnimation } from './use-indeterminate-animation'
import { useProgressBar as useAriaProgress } from './use-progress-bar'

interface Props extends RNNextUIProps {
  /**
   * Ref to the React Native component.
   */
  ref?: ReactRef<View | null>
  /**
   * Whether to show the value label.
   * @default false
   */
  showValueLabel?: boolean
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Progress classNames={{
   *    base:"base-classes",
   *    labelWrapper: "labelWrapper-classes",
   *    label: "label-classes",
   *    value: "value-classes",
   *    track: "track-classes",
   *    indicator: "indicator-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<ProgressSlots>
  className?: string
}

export type UseProgressProps = Props &
  AriaProgressBarProps &
  ProgressVariantProps
export const useProgress = (originalProps: UseProgressProps) => {
  const globalContext = useProviderContext()
  const [props, variantProps] = mapPropsVariants(
    originalProps,
    progress.variantKeys
  )

  const {
    ref,
    id,
    className,
    classNames,
    label,
    valueLabel,
    value = 0,
    minValue = 0,
    maxValue = 100,
    showValueLabel = false,
    formatOptions = {
      style: 'percent',
    },
    ...otherProps
  } = props

  const baseRef = useNativeRef(ref)

  const baseStyles = clsx(classNames?.base, className)
  const [, isMounted] = useIsMounted({ rerender: true, delay: 100 })

  const isIndeterminate = originalProps.isIndeterminate

  const disableAnimation =
    originalProps.disableAnimation ?? globalContext?.disableAnimation ?? false

  const { progressBarProps, labelProps } = useAriaProgress({
    id,
    label,
    value,
    minValue,
    maxValue,
    valueLabel,
    formatOptions,
    isIndeterminate,
    'aria-labelledby': originalProps['aria-labelledby'],
    'aria-label': originalProps['aria-label'],
  })

  const [width, setWidth] = useState(Dimensions.get('window').width)

  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout

    setWidth(width)
  }

  const indicatorAnimatedStyles = useIndeterminateAnimation(width)

  const slots = useMemo(
    () =>
      progress({
        ...variantProps,
        disableAnimation,
      }),
    [objectToDeps(variantProps), disableAnimation]
  )

  const selfMounted = disableAnimation ? true : isMounted

  // Calculate the width of the progress bar as a percentage
  const percentage = useMemo(
    () =>
      isIndeterminate || !selfMounted
        ? undefined
        : clampPercentage(((value - minValue) / (maxValue - minValue)) * 100),
    [selfMounted, isIndeterminate, value, minValue, maxValue]
  )

  const getProgressBarProps = useCallback<PropGetter>(
    (props = {}) => ({
      ref: baseRef,
      className: slots.base({ class: baseStyles }),
      onLayout: chain(onLayout, originalProps.onLayout),
      ...mergeProps(progressBarProps, otherProps, props),
    }),
    [
      baseRef,
      slots,
      isIndeterminate,
      originalProps.isDisabled,
      baseStyles,
      progressBarProps,
      otherProps,
    ]
  )

  const getLabelProps = useCallback<PropGetter>(
    (props = {}) => ({
      className: slots.label({ class: classNames?.label }),
      ...mergeProps(labelProps, props),
    }),
    [slots, classNames, labelProps]
  )

  const getIndicatorProps = useCallback<PropGetter>(
    (props = {}) => ({
      className: slots.indicator({
        class: clsx(
          originalProps.isStriped && 'bg-transparent',
          classNames?.indicator
        ),
      }),
      style: isIndeterminate
        ? indicatorAnimatedStyles
        : {
            transform: [
              {
                translateX: -width + (width / 100) * (percentage || 0),
              },
            ],
          },
      ...props,
    }),
    [
      slots,
      classNames,
      originalProps.isStriped,
      isIndeterminate,
      width,
      percentage,
      indicatorAnimatedStyles,
    ]
  )

  return {
    baseRef,
    slots,
    classNames,
    label,
    percentage,
    showValueLabel,
    isIndeterminate,
    isStriped: originalProps.isStriped,
    width,
    getProgressBarProps,
    getLabelProps,
    getIndicatorProps,
  }
}

export type UseProgressReturn = ReturnType<typeof useProgress>
