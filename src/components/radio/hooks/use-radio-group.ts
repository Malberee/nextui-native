import { useProviderContext } from '@/core'
import type { PropGetter, RNNextUIProps } from '@/core/system-rsc'
import {
  type RadioGroupSlots,
  type SlotsToClasses,
  radioGroup,
} from '@/core/theme'
import { type ReactRef, safeAriaLabel } from '@/utilities'
import { useNativeRef } from '@/utilities'
import { useRadioGroup as useRadioGroupAria } from '@react-native-aria/radio'
// import type { AriaRadioGroupProps } from '@react-types/radio'
import type { RNAriaRadioGroupProps } from '@react-native-aria/radio'
import { type RadioGroupState, useRadioGroupState } from '@react-stately/radio'
import clsx from 'clsx'
import { useCallback, useMemo } from 'react'
import type { View } from 'react-native'

import type { RadioProps } from '../radio'

interface Props extends RNNextUIProps {
  ref?: ReactRef<View | null>
  errorMessage?: string
  classNames?: SlotsToClasses<RadioGroupSlots>
  onValueChange?: RNAriaRadioGroupProps['onChange']
}

export type UseRadioGroupProps = Omit<Props, 'defaultChecked'> &
  Omit<RNAriaRadioGroupProps, 'onChange'> &
  Partial<
    Pick<RadioProps, 'color' | 'size' | 'isDisabled' | 'disableAnimation'>
  >

export type ContextType = {
  groupState: RadioGroupState
  isRequired?: UseRadioGroupProps['isRequired']
  isInvalid?: UseRadioGroupProps['isInvalid']
  color?: RadioProps['color']
  size?: RadioProps['size']
  isDisabled?: RadioProps['isDisabled']
  disableAnimation?: RadioProps['disableAnimation']
  onValueChange?: UseRadioGroupProps['onValueChange']
}

export const useRadioGroup = (props: UseRadioGroupProps) => {
  const globalContext = useProviderContext()

  const {
    ref,
    classNames,
    children,
    label,
    value,
    name,
    isInvalid: isInvalidProp,
    size = 'md',
    color = 'primary',
    isDisabled = false,
    disableAnimation = globalContext?.disableAnimation ?? false,
    orientation = 'vertical',
    isRequired = false,
    isReadOnly,
    errorMessage,
    description,
    className,
    onValueChange,
    ...otherProps
  } = props

  const groupRef = useNativeRef(ref)

  const otherPropsWithOrientation = useMemo<RNAriaRadioGroupProps>(
    () => ({
      ...otherProps,
      value,
      name,
      'aria-label': safeAriaLabel(otherProps['aria-label'], label),
      isRequired,
      isReadOnly,
      'isInvalid': isInvalidProp,
      orientation,
      'onChange': onValueChange,
    }),
    [
      otherProps,
      value,
      name,
      label,
      isRequired,
      isReadOnly,
      isInvalidProp,
      orientation,
      onValueChange,
    ]
  )

  const groupState = useRadioGroupState(otherPropsWithOrientation)

  const { labelProps, radioGroupProps: groupProps } = useRadioGroupAria(
    otherPropsWithOrientation,
    groupState
  )

  const isInvalid = otherPropsWithOrientation.isInvalid || groupState.isInvalid

  const context: ContextType = useMemo(
    () => ({
      size,
      color,
      groupState,
      isRequired,
      isInvalid,
      isDisabled,
      disableAnimation,
      onChange: onValueChange,
    }),
    [
      size,
      color,
      isRequired,
      isDisabled,
      isInvalid,
      onValueChange,
      disableAnimation,
      groupState.name,
      groupState.isDisabled,
      groupState.isReadOnly,
      groupState.isRequired,
      groupState.selectedValue,
    ]
  )

  const slots = useMemo(
    () => radioGroup({ isInvalid, orientation }),
    [isInvalid, orientation]
  )

  const baseStyles = clsx(classNames?.base, className)

  const getGroupProps: PropGetter = useCallback(
    () => ({
      ref: groupRef,
      className: slots.base({ class: baseStyles }),
      ...groupProps,
    }),
    [groupRef, slots, baseStyles, groupProps, otherProps]
  )

  const getLabelProps: PropGetter = useCallback(
    () => ({
      className: slots.label({ class: classNames?.label }),
      ...labelProps,
    }),
    [slots, classNames?.label, labelProps]
  )

  const getWrapperProps: PropGetter = useCallback(
    () => ({
      className: slots.wrapper({ class: classNames?.wrapper }),
      role: 'presentation',
    }),
    [slots, classNames?.wrapper]
  )

  const getDescriptionProps: PropGetter = useCallback(
    (props = {}) => ({
      ...props,
      className: slots.description({
        class: clsx(classNames?.description, props?.className),
      }),
    }),
    [slots, classNames?.description, description]
  )

  const getErrorMessageProps: PropGetter = useCallback(
    (props = {}) => ({
      ...props,
      className: slots.errorMessage({
        class: clsx(classNames?.errorMessage, props?.className),
      }),
    }),
    [slots, classNames?.errorMessage, errorMessage]
  )

  return {
    children,
    label,
    context,
    description,
    isInvalid,
    errorMessage,
    getGroupProps,
    getLabelProps,
    getWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
  }
}
