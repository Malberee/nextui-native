import { useProviderContext } from '@/core'
import {
  type PropGetter,
  type RNHeroUIProps,
  mapPropsVariants,
} from '@/core/system-rsc'
import { type SlotsToClasses } from '@/core/theme'
import {
  type CircularProgressSlots,
  type CircularProgressVariantProps,
  circularProgress,
} from '@/core/theme/components/circular-progress'
import { useIsMounted } from '@/hooks'
import {
  type ReactRef,
  clampPercentage,
  objectToDeps,
  useNativeRef,
} from '@/utilities'
import { mergeProps } from '@react-aria/utils'
import type { AriaProgressBarProps } from '@react-types/progress'
import clsx from 'clsx'
import { useCallback, useEffect, useMemo } from 'react'
import { type View } from 'react-native'
import {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { useProgressBar as useAriaProgress } from './use-progress-bar'

export interface Props extends RNHeroUIProps {
  /**
   * Ref to the React Native component.
   */
  ref?: ReactRef<View | null>
  /**
   * The stroke of the circle and tracker
   * @default 2
   */
  strokeWidth?: number
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
   * <CircularProgress classNames={{
   *    base:"base-classes",
   *    label: "label-classes",
   *    value: "value-classes",
   *    svg: "svg-classes", // the svg wrapper
   *    track: "track-classes", // the circle of the background
   *    indicator: "indicator-classes", // the circle of the progress
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<CircularProgressSlots>
  className?: string
}

export type UseCircularProgressProps = Props &
  AriaProgressBarProps &
  CircularProgressVariantProps

export const useCircularProgress = (
  originalProps: UseCircularProgressProps
) => {
  const globalContext = useProviderContext()
  const [props, variantProps] = mapPropsVariants(
    originalProps,
    circularProgress.variantKeys
  )

  const {
    ref,
    id,
    className,
    classNames,
    label,
    valueLabel,
    value = undefined,
    minValue = 0,
    maxValue = 100,
    strokeWidth: strokeWidthProp,
    showValueLabel = false,
    formatOptions = {
      style: 'percent',
    },
    ...otherProps
  } = props

  const baseRef = useNativeRef(ref)

  const baseStyles = clsx(classNames?.base, className)
  const [, isMounted] = useIsMounted({ rerender: true, delay: 100 })

  // default isIndeterminate to true
  const isIndeterminate =
    (originalProps.isIndeterminate ?? true) && value === undefined
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

  const slots = useMemo(
    () =>
      circularProgress({ ...variantProps, disableAnimation, isIndeterminate }),
    [objectToDeps(variantProps), disableAnimation, isIndeterminate]
  )

  const selfMounted = disableAnimation ? true : isMounted

  const center = 16
  const strokeWidth = strokeWidthProp || (originalProps.size === 'sm' ? 2 : 3)

  const radius = 16 - strokeWidth
  const circumference = 2 * radius * Math.PI

  const percentage = useMemo(() => {
    if (!selfMounted) {
      return 0
    }

    if (isIndeterminate) {
      return 0.25
    }

    return value
      ? clampPercentage((value - minValue) / (maxValue - minValue), 1)
      : 0
  }, [selfMounted, value, minValue, maxValue, isIndeterminate])

  // const offset = circumference - percentage * circumference
  const offset = useSharedValue(circumference - percentage * circumference)

  useEffect(() => {
    offset.value = withTiming(circumference - percentage * circumference, {
      duration: 500,
    })
  }, [circumference, percentage])

  const getProgressBarProps = useCallback<PropGetter>(
    (props = {}) => ({
      ref: baseRef,

      className: slots.base({ class: baseStyles }),
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

  const getSvgProps = useCallback<PropGetter>(
    (props = {}) => ({
      viewBox: '0 0 32 32',
      fill: 'none',
      strokeWidth,
      className: slots.svg({ class: classNames?.svg }),
      ...props,
    }),
    [strokeWidth, slots, classNames]
  )

  const animatedIndicatorProps = useAnimatedProps(() => ({
    strokeDashoffset: offset.value,
  }))

  const getIndicatorProps = useCallback<PropGetter>(
    (props = {}) => ({
      cx: center,
      cy: center,
      r: radius,
      role: 'presentation',
      strokeDasharray: `${circumference} ${circumference}`,
      transform: 'rotate(-90 16 16)',
      strokeLinecap: 'round',
      stroke: 'currentColor',
      className: slots.indicator({ class: classNames?.indicator }),
      animatedProps: animatedIndicatorProps,
      ...props,
    }),
    [slots, classNames, offset.value, circumference, radius]
  )

  const getTrackProps = useCallback<PropGetter>(
    (props = {}) => ({
      cx: center,
      cy: center,
      r: radius,
      role: 'presentation',
      strokeDasharray: `${circumference} ${circumference}`,
      strokeDashoffset: 0,
      transform: 'rotate(-90 16 16)',
      strokeLinecap: 'round',
      className: slots.track({ class: classNames?.track }),
      ...props,
    }),
    [slots, classNames, circumference, radius]
  )

  return {
    baseRef,
    slots,
    classNames,
    label,
    showValueLabel,
    getProgressBarProps,
    getLabelProps,
    getSvgProps,
    getIndicatorProps,
    getTrackProps,
  }
}
