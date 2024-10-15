import { useProviderContext } from '@/core'
import {
  type PropGetter,
  type RNNextUIProps,
  mapPropsVariants,
} from '@/core/system-rsc'
import {
  type SlotsToClasses,
  type ToggleSlots,
  type ToggleVariantProps,
  toggle,
} from '@/core/theme'
import { objectToDeps } from '@/utilities'
import { mergeProps, mergeRefs } from '@react-aria/utils'
import { useSwitch as useAriaSwitch } from '@react-native-aria/switch'
import { useToggleState } from '@react-stately/toggle'
import type { AriaSwitchProps } from '@react-types/switch'
import clsx from 'clsx'
import {
  type ReactNode,
  type Ref,
  type RefObject,
  useCallback,
  useId,
  useMemo,
  useRef,
} from 'react'
import type { PressableProps, View } from 'react-native'

export type SwitchThumbIconProps = {
  width: string
  height: string
  isSelected: boolean
  className: string
}

interface Props extends RNNextUIProps {
  ref?: Ref<View>
  children?: ReactNode
  isDisabled?: boolean
  thumbIcon?: ReactNode | ((props: SwitchThumbIconProps) => ReactNode)
  startContent?: ReactNode
  endContent?: ReactNode
  classNames?: SlotsToClasses<ToggleSlots>
  className?: string
  onValueChange?: (value: boolean) => void
}

export type UseSwitchProps = Omit<Props, 'defaultChecked'> &
  Omit<AriaSwitchProps, keyof ToggleVariantProps | 'onChange'> &
  ToggleVariantProps

export const useSwitch = (originalProps: UseSwitchProps = {}) => {
  const globalContext = useProviderContext()

  const [props, variantProps] = mapPropsVariants(
    originalProps,
    toggle.variantKeys
  )

  const {
    ref,
    children,
    isReadOnly: isReadOnlyProp = false,
    startContent,
    endContent,
    defaultSelected,
    isSelected: isSelectedProp,
    thumbIcon,
    className,
    classNames,
    onValueChange,
    ...otherProps
  } = props

  const inputRef = useRef<View>(null)

  const disableAnimation =
    originalProps.disableAnimation ?? globalContext?.disableAnimation ?? false

  const labelId = useId()

  const ariaSwitchProps = useMemo(() => {
    const ariaLabel =
      otherProps['aria-label'] || typeof children === 'string'
        ? (children as string)
        : undefined

    return {
      children,
      defaultSelected,
      'isSelected': isSelectedProp,
      'isDisabled': !!originalProps.isDisabled,
      'isReadOnly': isReadOnlyProp,
      'aria-label': ariaLabel,
      'aria-labelledby': otherProps['aria-labelledby'] || labelId,
      'onChange': onValueChange,
    }
  }, [
    labelId,
    children,
    isReadOnlyProp,
    isSelectedProp,
    defaultSelected,
    originalProps.isDisabled,
    otherProps['aria-label'],
    otherProps['aria-labelledby'],
    onValueChange,
  ])

  const state = useToggleState(ariaSwitchProps)

  const { inputProps } = useAriaSwitch(
    ariaSwitchProps,
    state,
    ref as RefObject<HTMLInputElement>
  )

  const isSelected = inputProps.checked
  const isDisabled = inputProps.disabled

  const slots = useMemo(
    () => toggle({ ...variantProps, disableAnimation, isChecked: isSelected }),
    [objectToDeps(variantProps), disableAnimation, isSelected]
  )

  const baseStyles = clsx(classNames?.base, className)

  const getBaseProps: PropGetter<Record<string, unknown>, PressableProps> = (
    props
  ) => ({
    ...mergeProps(inputProps, otherProps, props),
    'ref': mergeRefs(inputRef, ref),
    'disabled': isDisabled || isReadOnlyProp,
    'className': slots.base({ class: clsx(baseStyles, props?.className) }),
    'aria-selected': isSelected,
    'aria-disabled': isDisabled || isReadOnlyProp,
  })

  const getWrapperProps: PropGetter = useCallback(
    (props = {}) => ({
      ...props,
      className: clsx(
        slots.wrapper({ class: clsx(classNames?.wrapper, props?.className) })
      ),
    }),
    [slots, classNames?.wrapper]
  )

  const getThumbProps: PropGetter = useCallback(
    (props) => ({
      ...props,
      className: slots.thumb({
        class: clsx(classNames?.thumb, props?.className),
      }),
    }),
    [slots, classNames?.thumb]
  )

  const getLabelProps: PropGetter = useCallback(
    (props = {}) => ({
      ...props,
      id: labelId,
      className: slots.label({
        class: clsx(classNames?.label, props?.className),
      }),
    }),
    [slots, classNames?.label, isDisabled, isSelected]
  )

  const getThumbIconProps = useCallback(
    (props = { includeStateProps: false }) =>
      mergeProps(
        {
          className: slots.thumbIcon({
            class: clsx(classNames?.thumbIcon, 'size-1'),
          }),
        },
        props.includeStateProps ? { isSelected: isSelected } : {}
      ) as unknown as SwitchThumbIconProps,
    [slots, classNames?.thumbIcon, isSelected]
  )

  const getStartContentProps = useCallback<PropGetter>(
    (props = {}) => ({
      ...props,
      className: slots.startContent({
        class: clsx(classNames?.endContent, props?.className, 'size-1'),
      }),
    }),
    [slots, classNames?.startContent, isSelected]
  )

  const getEndContentProps = useCallback<PropGetter>(
    (props = {}) => ({
      ...props,
      className: slots.endContent({
        class: clsx(classNames?.endContent, props?.className, 'size-1'),
      }),
    }),
    [slots, classNames?.endContent, isSelected]
  )

  return {
    slots,
    classNames,
    ref,
    children,
    thumbIcon,
    startContent,
    endContent,
    isSelected,
    isDisabled,
    getBaseProps,
    getWrapperProps,
    getLabelProps,
    getThumbProps,
    getThumbIconProps,
    getStartContentProps,
    getEndContentProps,
  }
}
