import { useProviderContext } from '@/core'
import type { PropGetter, RNNextUIProps } from '@/core/system-rsc'
import {
  type CheckboxGroupSlots,
  type SlotsToClasses,
  checkboxGroup,
} from '@/core/theme'
import { type ReactRef, safeAriaLabel } from '@/utilities'
import { useNativeRef } from '@/utilities/react-utils/refs'
import { chain } from '@react-aria/utils'
import { useCheckboxGroup as useAriaCheckboxGroup } from '@react-native-aria/checkbox'
import {
  type CheckboxGroupState,
  useCheckboxGroupState,
} from '@react-stately/checkbox'
import type { AriaCheckboxGroupProps } from '@react-types/checkbox'
import clsx from 'clsx'
import { useCallback, useMemo } from 'react'
import type { View } from 'react-native'

import type { CheckboxGroupProps, CheckboxProps } from '../index'

interface Props extends RNNextUIProps {
  ref?: ReactRef<View | null>
  errorMessage?: string
  description?: string
  orientation?: 'vertical' | 'horizontal'
  classNames?: SlotsToClasses<CheckboxGroupSlots>
  onValueChange?: AriaCheckboxGroupProps['onChange']
}

export type UseCheckboxGroupProps = Props &
  AriaCheckboxGroupProps &
  Partial<
    Pick<
      CheckboxProps,
      | 'color'
      | 'size'
      | 'radius'
      | 'lineThrough'
      | 'isDisabled'
      | 'disableAnimation'
    >
  >

export type ContextType = {
  groupState: CheckboxGroupState
  color?: CheckboxProps['color']
  size?: CheckboxProps['size']
  radius?: CheckboxProps['radius']
  isInvalid?: UseCheckboxGroupProps['isInvalid']
  lineThrough?: CheckboxProps['lineThrough']
  isDisabled?: CheckboxProps['isDisabled']
  disableAnimation?: CheckboxProps['disableAnimation']
  validationBehavior?: CheckboxProps['validationBehavior']
}

export const useCheckboxGroup = (props: UseCheckboxGroupProps) => {
  const globalContext = useProviderContext()

  const {
    ref,
    classNames,
    children,
    label,
    radius,
    value,
    name,
    defaultValue,
    isInvalid: isInvalidProp,
    size = 'md',
    color = 'primary',
    orientation = 'vertical',
    lineThrough = false,
    isDisabled = false,
    disableAnimation = globalContext?.disableAnimation ?? false,
    isReadOnly,
    isRequired,
    onValueChange,
    description,
    errorMessage,
    className,
    ...otherProps
  } = props

  const pressableRef = useNativeRef(ref)

  const checkboxGroupProps = useMemo<CheckboxGroupProps>(
    () => ({
      ...otherProps,
      value,
      name,
      'aria-label': safeAriaLabel(otherProps['aria-label'], label),
      defaultValue,
      isRequired,
      isReadOnly,
      orientation,
      'isInvalid': isInvalidProp,
      'onChange': chain(props.onChange, onValueChange),
    }),
    [
      value,
      name,
      label,
      defaultValue,
      isRequired,
      isReadOnly,
      orientation,
      onValueChange,
      isInvalidProp,
      otherProps['aria-label'],
      otherProps,
    ]
  )

  const groupState = useCheckboxGroupState(checkboxGroupProps)

  const { labelProps, groupProps } = useAriaCheckboxGroup(
    checkboxGroupProps,
    groupState
  )

  const context = useMemo<ContextType>(
    () => ({
      size,
      color,
      radius,
      lineThrough,
      isInvalid: groupState.isInvalid,
      isDisabled,
      disableAnimation,
      groupState,
    }),
    [
      size,
      color,
      radius,
      lineThrough,
      isDisabled,
      disableAnimation,
      groupState.value,
      groupState.isDisabled,
      groupState.isReadOnly,
      groupState.isInvalid,
      groupState.isSelected,
    ]
  )

  const slots = useMemo(
    () =>
      checkboxGroup({
        isInvalid: groupState.isInvalid,
        disableAnimation,
        orientation,
      }),
    [groupState.isInvalid, disableAnimation]
  )

  const baseStyles = clsx(classNames?.base, className)

  const getGroupProps: PropGetter = useCallback(
    () => ({
      ref: pressableRef,
      className: slots.base({ class: baseStyles }),
      ...groupProps,
    }),
    [slots, pressableRef]
  )

  const getLabelProps: PropGetter = useCallback(
    () => ({
      className: slots.label({ class: classNames?.label }),
      ...labelProps,
    }),
    [slots, labelProps, classNames?.label]
  )

  const getWrapperProps: PropGetter = useCallback(
    () => ({
      className: slots.wrapper({ class: classNames?.wrapper }),
      role: 'presentation',
    }),
    [slots, orientation, classNames?.wrapper]
  )

  const getDescriptionProps: PropGetter = useCallback(
    (props = {}) => ({
      ...props,
      className: slots.description({
        class: clsx(classNames?.description, props?.className),
      }),
    }),
    [slots, classNames?.description]
  )

  const getErrorMessageProps: PropGetter = useCallback(
    (props = {}) => ({
      ...props,
      className: slots.errorMessage({
        class: clsx(classNames?.errorMessage, props?.className),
      }),
    }),
    [slots, classNames?.errorMessage]
  )

  return {
    children,
    label,
    context,
    description,
    isInvalid: groupState.isInvalid,
    errorMessage,
    getGroupProps,
    getLabelProps,
    getWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
  }
}
