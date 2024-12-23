import { useProviderContext } from '@/core'
import {
  type PropGetter,
  type RNNextUIProps,
  mapPropsVariants,
} from '@/core/system-rsc'
import {
  type SliderSlots,
  type SliderVariantProps,
  type SlotsToClasses,
  slider,
} from '@/core/theme'
import {
  type ReactRef,
  getLocale,
  objectToDeps,
  useLayout,
  useNativeRef,
} from '@/utilities'
import type { AriaSliderProps } from '@react-aria/slider'
import { mergeProps } from '@react-aria/utils'
import { useSlider as useAriaSlider } from '@react-native-aria/slider'
import { useSliderState } from '@react-stately/slider'
import type { ValueBase } from '@react-types/shared'
import clsx from 'clsx'
import { type ReactNode, useCallback, useMemo, useRef } from 'react'
import type { GestureResponderEvent, View, ViewProps } from 'react-native'

export type SliderValue = number | number[]
export type SliderStepMark = {
  value: number
  label: string
}

export type SliderRenderThumbProps = ViewProps & { index?: number }

interface Props extends RNNextUIProps {
  /**
   * Ref to the React Native component.
   */
  ref?: ReactRef<View | null>
  /**
   * The content to display as the label.
   */
  label?: ReactNode
  /**
   * The input name.
   */
  name?: string
  /**
   * The offset from which to start the fill.
   */
  fillOffset?: number
  /**
   * The display format of the value label.
   */
  formatOptions?: Intl.NumberFormatOptions
  /**
   * Whether to show the step indicators.
   * @default false
   */
  showSteps?: boolean
  /**
   * Custom steps labels.
   * @example [{value: 0, label: "0"}, {value: 50, label: "50"}, {value: 100, label: "100"}]
   * @default []
   */
  marks?: SliderStepMark[]
  /**
   * Element to be rendered in the start side of the slider.
   */
  startContent?: ReactNode
  /**
   * Element to be rendered in the end side of the slider.
   */
  endContent?: ReactNode
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Slider classNames={{
   *    base:"base-classes",
   *    step: "step-classes",
   *    labelWrapper: "label-wrapper-classes",
   *    label: "label-classes",
   *    value: "value-classes",
   *    trackWrapper: "track-wrapper-classes",
   *    track: "track-classes",
   *    filler: "filler-classes",
   *    thumb: "thumb-classes",
   *    mark: "mark-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<SliderSlots>
  className?: string
  /**
   * A function that returns the content to display as the value label.
   * Overrides default formatted number.
   */
  getValue?: (value: SliderValue) => string
  /**
   * Function to render the label.
   */
  renderLabel?: (props: ViewProps) => ReactNode
  /**
   * Function to render the value label.
   */
  renderValue?: (props: ViewProps) => ReactNode
  /**
   * Function to render the thumb. It can be used to add a tooltip or custom icon.
   */
  renderThumb?: (props: SliderRenderThumbProps) => ReactNode
}

export type UseSliderProps = Omit<Props, keyof ValueBase<SliderValue>> &
  AriaSliderProps &
  SliderVariantProps

export const useSlider = (originalProps: UseSliderProps) => {
  const globalContext = useProviderContext()

  const [props, variantProps] = mapPropsVariants(
    originalProps,
    slider.variantKeys
  )

  const {
    ref,
    name,
    label,
    formatOptions,
    value: valueProp,
    maxValue = 100,
    minValue = 0,
    step = 1,
    showSteps = false,
    orientation = 'horizontal',
    marks = [],
    startContent,
    endContent,
    fillOffset,
    className,
    classNames,
    renderThumb,
    renderLabel,
    renderValue,
    onChange,
    onChangeEnd,
    getValue,
    ...otherProps
  } = props

  const disableAnimation =
    originalProps?.disableAnimation ?? globalContext?.disableAnimation ?? false

  const baseRef = useNativeRef(ref)
  const trackRef = useRef<View>(null)

  const numberFormatter = new Intl.NumberFormat(getLocale(), formatOptions)

  const clampValue = useCallback(
    (valueToClamp: number) =>
      Math.min(Math.max(valueToClamp, minValue), maxValue),
    [minValue, maxValue]
  )

  const validatedValue = useMemo(() => {
    if (valueProp === undefined) return undefined

    if (Array.isArray(valueProp)) {
      return valueProp.map(clampValue)
    }

    return clampValue(valueProp)
  }, [valueProp, clampValue])

  const isDisabled = originalProps?.isDisabled ?? false

  const state = useSliderState({
    ...otherProps,
    value: validatedValue,
    isDisabled,
    orientation,
    step,
    minValue,
    maxValue,
    numberFormatter,
    onChange,
    onChangeEnd,
  })

  const { onLayout, layout: trackLayout } = useLayout()

  const { groupProps, trackProps, labelProps, outputProps } = useAriaSlider(
    originalProps,
    state,
    trackLayout
  )

  const baseStyles = clsx(classNames?.base, className)
  const isVertical = orientation === 'vertical'
  const hasMarks = marks?.length > 0
  const hasSingleThumb =
    fillOffset === undefined ? state.values.length === 1 : false

  const slots = useMemo(
    () =>
      slider({
        ...variantProps,
        hasMarks,
        disableAnimation,
        hasSingleThumb,
        isVertical,
        className,
      }),
    [
      objectToDeps(variantProps),
      isVertical,
      disableAnimation,
      hasSingleThumb,
      hasMarks,
      className,
    ]
  )

  const [startOffset = 0, endOffset = 0] = [
    state.values.length > 1
      ? state.getThumbPercent(0)
      : fillOffset !== undefined
        ? state.getValuePercent(fillOffset)
        : 0,
    state.getThumbPercent(state.values.length - 1),
  ].sort()

  const formatNumberRange = (start: number, end: number) => {
    if (start === end) return `~${numberFormatter.format(start)}`

    return `${numberFormatter.format(start)} - ${numberFormatter.format(end)}`
  }

  const value =
    state.values.length === 1
      ? numberFormatter.format(state.getThumbValue(0))
      : formatNumberRange(
          state.getThumbValue(0),
          state.getThumbValue(state.values.length - 1)
        )

  const steps = showSteps ? Math.floor((maxValue - minValue) / step) + 1 : 0

  const ariaSliderProps = useMemo(
    () => ({
      'role': 'group',
      'aria-disabled': isDisabled,
    }),
    [isDisabled]
  )

  const getBaseProps: PropGetter = (props = {}) => {
    return {
      ref: baseRef,
      className: slots.base({ class: baseStyles }),
      ...mergeProps(groupProps, otherProps, props, ariaSliderProps),
    }
  }

  const getLabelWrapperProps: PropGetter = (props = {}) => {
    return {
      className: slots.labelWrapper({ class: classNames?.labelWrapper }),
      ...props,
    }
  }

  const getLabelProps: PropGetter = (props = {}) => {
    return {
      className: slots.label({ class: classNames?.label }),
      children: label,
      ...labelProps,
      ...props,
    }
  }

  const getValueProps: PropGetter = (props = {}) => {
    return {
      className: slots.value({ class: classNames?.value }),
      children:
        getValue && typeof getValue === 'function'
          ? getValue(state.values)
          : value,
      ...outputProps,
      ...props,
    }
  }

  const getTrackProps: PropGetter = (props = {}) => {
    return {
      className: slots.track({ class: classNames?.track }),
      onLayout,
      ...trackProps,
      ...props,
    }
  }

  const getTrackWrapperProps: PropGetter = (props = {}) => {
    return {
      className: slots.trackWrapper({ class: classNames?.trackWrapper }),
      ...props,
    }
  }

  const getFillerProps: PropGetter = (props = {}) => {
    return {
      className: slots.filler({ class: classNames?.filler }),
      ...props,
      style: {
        // @ts-ignore
        ...props?.style,
        [isVertical ? 'bottom' : 'left']: `${startOffset * 100}%`,
        ...(isVertical
          ? {
              height: `${(endOffset - startOffset) * 100}%`,
            }
          : {
              width: `${(endOffset - startOffset) * 100}%`,
            }),
      },
    }
  }

  const getThumbProps = (index: number) => {
    return {
      'aria-valuemax': maxValue,
      'aria-valuemin': minValue,
      'aria-valuetext': numberFormatter.format(state.getThumbValue(index)),
      name,
      index,
      state,
      trackRef,
      trackLayout,
      orientation,
      isVertical,
      renderThumb,
      'className': slots.thumb({ class: classNames?.thumb }),
    }
  }

  const getStepProps = (index: number) => {
    const percent = state.getValuePercent(index * step + minValue)

    return {
      className: slots.step({
        isInRange: percent <= endOffset && percent >= startOffset,
        class: classNames?.step,
      }),
      style: {
        [isVertical ? 'bottom' : 'left']: `${percent * 100}%`,
      },
    }
  }

  const getMarkProps = (mark: SliderStepMark) => {
    const percent = state.getValuePercent(mark.value)

    return {
      'data-slot': 'mark',
      'className': slots.mark({
        class: classNames?.mark,
        isInRange: percent <= endOffset && percent >= startOffset,
      }),
      'style': {
        [isVertical ? 'bottom' : 'left']: `${percent * 100}%`,
      },
      'onPress': (e: GestureResponderEvent) => {
        e?.stopPropagation()

        if (state.values.length === 1) {
          state.setThumbValue(0, percent)
        } else {
          const leftThumbVal = state.values[0] ?? 0
          const rightThumbVal = state.values[1] ?? 0

          if (mark.value < leftThumbVal) {
            state.setThumbPercent(0, percent)
          } else if (mark.value > rightThumbVal) {
            state.setThumbPercent(1, percent)
          } else if (
            Math.abs(mark.value - leftThumbVal) <
            Math.abs(mark.value - rightThumbVal)
          ) {
            state.setThumbPercent(0, percent)
          } else {
            state.setThumbPercent(1, percent)
          }
        }
      },
    }
  }

  const getStartContentProps: PropGetter = (props = {}) => ({
    className: slots.startContent({ class: classNames?.startContent }),
    ...props,
  })

  const getEndContentProps: PropGetter = (props = {}) => ({
    className: slots.endContent({ class: classNames?.endContent }),
    ...props,
  })

  return {
    state,
    value,
    baseRef,
    label,
    steps,
    marks,
    startContent,
    endContent,
    getStepProps,
    getBaseProps,
    getValue,
    renderLabel,
    renderValue,
    getTrackWrapperProps,
    getLabelWrapperProps,
    getLabelProps,
    getValueProps,
    getTrackProps,
    getFillerProps,
    getThumbProps,
    getMarkProps,
    getStartContentProps,
    getEndContentProps,
  }
}
