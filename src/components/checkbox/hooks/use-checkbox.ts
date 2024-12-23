import { useProviderContext } from '@/core'
import type { PropGetter, RNNextUIProps } from '@/core/system-rsc'
import {
  type CheckboxSlots,
  type CheckboxVariantProps,
  type SlotsToClasses,
  checkbox,
} from '@/core/theme'
import { safeAriaLabel, warn } from '@/utilities'
import { mergeProps, mergeRefs } from '@react-aria/utils'
import {
  useCheckbox as useAriaCheckbox,
  useCheckboxGroupItem as useAriaCheckboxGroupItem,
} from '@react-native-aria/checkbox'
import { useToggleState } from '@react-stately/toggle'
import type { AriaCheckboxProps } from '@react-types/checkbox'
import clsx from 'clsx'
import {
  type ReactNode,
  type Ref,
  useCallback,
  useId,
  useMemo,
  useRef,
} from 'react'
import type { View } from 'react-native'

import { useCheckboxGroupContext } from '../checkbox-group-context'

export type CheckboxIconProps = {
  isSelected: boolean
  isIndeterminate: boolean
  disableAnimation: boolean
  className: string
}

interface Props extends Omit<RNNextUIProps, keyof CheckboxVariantProps> {
  /**
   * Ref to the React Native component.
   */
  ref?: Ref<View>
  /**
   * The label of the checkbox.
   */
  children?: ReactNode
  /**
   * Whether the checkbox is disabled.
   * @default false
   */
  isDisabled?: boolean
  /**
   * The icon to be displayed when the checkbox is checked.
   */
  isRequired?: boolean
  isReadOnly?: boolean
  isSelected?: boolean
  isIndeterminate?: boolean
  defaultSelected?: boolean
  /**
   * The icon to be displayed when the checkbox is checked.
   */
  icon?: ReactNode | ((props: CheckboxIconProps) => ReactNode)
  /**
   * React aria onChange event.
   */
  onValueChange?: AriaCheckboxProps['onChange']
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Checkbox classNames={{
   *    base:"base-classes",
   *    wrapper: "wrapper-classes",
   *    icon: "icon-classes",
   *    label: "label-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<CheckboxSlots>
  className?: string
}

export type UseCheckboxProps = Omit<Props, 'defaultChecked'> &
  Omit<AriaCheckboxProps, keyof CheckboxVariantProps | 'onChange'> &
  CheckboxVariantProps

export const useCheckbox = (props: UseCheckboxProps = {}) => {
  const globalContext = useProviderContext()
  const groupContext = useCheckboxGroupContext()
  const isInGroup = !!groupContext

  const {
    ref,
    value = '',
    children,
    icon,
    name,
    isRequired,
    isReadOnly: isReadOnlyProp = false,
    isSelected: isSelectedProp,
    size = groupContext?.size ?? 'md',
    color = groupContext?.color ?? 'primary',
    radius = groupContext?.radius,
    lineThrough = groupContext?.lineThrough ?? false,
    isDisabled: isDisabledProp = groupContext?.isDisabled ?? false,
    disableAnimation = groupContext?.disableAnimation ??
      globalContext?.disableAnimation ??
      false,
    isInvalid = groupContext?.isInvalid ?? false,
    isIndeterminate = false,
    defaultSelected,
    classNames,
    className,
    onValueChange,
    ...otherProps
  } = props

  if (groupContext && __DEV__) {
    if (isSelectedProp) {
      warn(
        'The Checkbox.Group is being used, `isSelected` will be ignored. Use the `value` of the Checkbox.Group instead.',
        'Checkbox'
      )
    }
    if (defaultSelected) {
      warn(
        'The Checkbox.Group is being used, `defaultSelected` will be ignored. Use the `defaultValue` of the Checkbox.Group instead.',
        'Checkbox'
      )
    }
  }

  const pressableRef = useRef<View>(null)

  const labelId = useId()

  const ariaCheckboxProps = useMemo(
    () => ({
      name,
      value,
      children,
      defaultSelected,
      isIndeterminate,
      isRequired,
      isInvalid,
      'isSelected': isSelectedProp,
      'isDisabled': isDisabledProp,
      'isReadOnly': isReadOnlyProp,
      'aria-label': safeAriaLabel(otherProps['aria-label'], children),
      'aria-labelledby': otherProps['aria-labelledby'] || labelId,
      'onChange': onValueChange,
    }),
    [
      value,
      name,
      labelId,
      children,
      isInvalid,
      isIndeterminate,
      isDisabledProp,
      isReadOnlyProp,
      isSelectedProp,
      isRequired,
      defaultSelected,
      otherProps['aria-label'],
      otherProps['aria-labelledby'],
      onValueChange,
    ]
  )

  const toggleState = useToggleState(ariaCheckboxProps)

  const { inputProps } = isInGroup
    ? // eslint-disable-next-line
      useAriaCheckboxGroupItem(
        { ...ariaCheckboxProps },
        groupContext.groupState,
        pressableRef
      ) // eslint-disable-next-line
    : useAriaCheckbox({ ...ariaCheckboxProps }, toggleState, pressableRef)

  const slots = useMemo(
    () =>
      checkbox({
        color,
        size,
        radius,
        isInvalid,
        lineThrough,
        isIndeterminate,
        isDisabled: isDisabledProp,
        disableAnimation,
      }),
    [
      color,
      size,
      radius,
      isInvalid,
      lineThrough,
      isIndeterminate,
      isDisabledProp,
      inputProps.checked,
      disableAnimation,
    ]
  )

  const baseStyles = clsx(classNames?.base, className)

  const getBaseProps: PropGetter = useCallback(
    () => ({
      ref: mergeRefs(ref, pressableRef),
      className: slots.base({ class: baseStyles }),
      selected: inputProps.checked,
      ...mergeProps(otherProps, inputProps),
      ...(isIndeterminate && { onPress: null }),
    }),
    [
      slots,
      baseStyles,
      isIndeterminate,
      isInvalid,
      inputProps.checked,
      otherProps,
    ]
  )

  const getWrapperProps: PropGetter = useCallback(
    (props = {}) => ({
      className: clsx(
        slots.wrapper({ class: clsx(classNames?.wrapper, props?.className) })
      ),
      ...props,
    }),
    [slots, classNames?.wrapper]
  )

  const getLabelProps: PropGetter = useCallback(
    () => ({
      id: labelId,
      className: slots.label({ class: classNames?.label }),
    }),
    [slots, classNames?.label, isDisabledProp, inputProps.checked, isInvalid]
  )

  const getIconProps = useCallback(
    () =>
      ({
        isSelected: inputProps.checked,
        isIndeterminate,
        disableAnimation,
        className: slots.icon({ class: classNames?.icon }),
      }) as CheckboxIconProps,
    [
      slots,
      classNames?.icon,
      inputProps.checked,
      isIndeterminate,
      disableAnimation,
    ]
  )

  return {
    icon,
    children,
    slots,
    getBaseProps,
    getWrapperProps,
    getLabelProps,
    getIconProps,
  }
}

export type UseCheckboxReturn = ReturnType<typeof useCheckbox>
