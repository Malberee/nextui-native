import { useProviderContext } from '@/core'
import type { PropGetter } from '@/core/system-rsc'
import { checkbox } from '@/core/theme'
import { safeAriaLabel } from '@/utilities'
import { chain, mergeProps, mergeRefs } from '@react-aria/utils'
import { useCheckbox as useAriaCheckbox } from '@react-native-aria/checkbox'
import { useToggleState } from '@react-stately/toggle'
import clsx from 'clsx'
import { useCallback, useId, useMemo, useRef } from 'react'
import type { View } from 'react-native'

import type { CheckboxIconProps, UseCheckboxProps } from '../checkbox.types'

export const useCheckbox = (props: UseCheckboxProps = {}) => {
  const globalContext = useProviderContext()
  // const groupContext
  // const isInGroup = !!groupContext

  const {
    ref,
    children,
    icon,
    isRequired,
    isReadOnly: isReadOnlyProp = false,
    isSelected: isSelectedProp,
    size,
    color,
    radius,
    lineThrough,
    isDisabled: isDisabledProp,
    disableAnimation = globalContext?.disableAnimation ?? false,
    isInvalid,
    isIndeterminate = false,
    defaultSelected,
    classNames,
    className,
    onValueChange,
    ...otherProps
  } = props

  const pressableRef = useRef<View>(null)

  const labelId = useId()

  const ariaCheckboxProps = useMemo(
    () => ({
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
      labelId,
      children,
      isInvalid,
      isIndeterminate,
      isDisabledProp,
      isReadOnlyProp,
      isSelectedProp,
      defaultSelected,
      otherProps['aria-label'],
      otherProps['aria-labelledby'],
      onValueChange,
    ]
  )

  const toggleState = useToggleState(ariaCheckboxProps)
  const { isSelected, toggle } = toggleState

  const { inputProps } = useAriaCheckbox(
    { ...ariaCheckboxProps },
    toggleState,
    pressableRef
  )

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
        isSelected,
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
      isSelected,
      disableAnimation,
    ]
  )

  const baseStyles = clsx(classNames?.base, className)

  const onPress = chain(!isIndeterminate && toggle, () =>
    onValueChange?.(!isSelected)
  )

  const getBaseProps: PropGetter = useCallback(
    () => ({
      ref: mergeRefs(ref, pressableRef),
      className: slots.base({ class: baseStyles }),
      ...mergeProps(otherProps, inputProps),
      onPress,
    }),
    [slots, baseStyles, isIndeterminate, isInvalid, otherProps]
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
    [slots, classNames?.label, isDisabledProp, isSelected, isInvalid]
  )

  const getIconProps = useCallback(
    () =>
      ({
        isSelected,
        isIndeterminate,
        disableAnimation,
        className: slots.icon({ class: classNames?.icon }),
      }) as CheckboxIconProps,
    [slots, classNames?.icon, isSelected, isIndeterminate, disableAnimation]
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
