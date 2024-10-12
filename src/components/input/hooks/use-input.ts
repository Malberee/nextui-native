import { useProviderContext } from '@/core'
import {
  type PropGetter,
  type RNNextUIProps,
  mapPropsVariants,
} from '@/core/system-rsc'
import {
  type InputSlots,
  type InputVariantProps,
  type SlotsToClasses,
  input,
} from '@/core/theme'
import { isEmpty, objectToDeps, useNativeRef } from '@/utilities'
import { chain, mergeProps } from '@react-aria/utils'
import { usePress } from '@react-native-aria/interactions'
import { useControlledState } from '@react-stately/utils'
import type { AriaTextFieldProps } from '@react-types/textfield'
import clsx from 'clsx'
import type React from 'react'
import { type Ref, useCallback, useEffect, useMemo, useState } from 'react'
import type { TextInput, TextInputProps, View } from 'react-native'

import { useFormControl } from './use-form-control'

export interface Props<T extends TextInput = TextInput>
  extends Omit<RNNextUIProps, keyof InputVariantProps> {
  ref?: Ref<T>
  baseRef?: Ref<View>
  wrapperRef?: Ref<View>
  innerWrapperRef?: Ref<View>
  startContent?: React.ReactNode
  endContent?: React.ReactNode
  classNames?: SlotsToClasses<InputSlots>
  className?: string
  onClear?: () => void
  onValueChange?: (value: string) => void
}

export type UseInputProps<T extends TextInput = TextInput> = Props<T> &
  Omit<AriaTextFieldProps, 'onChange'> &
  InputVariantProps

export const useInput = <T extends TextInput = TextInput>(
  originalProps: UseInputProps<T>
) => {
  const globalContext = useProviderContext()

  const [props, variantProps] = mapPropsVariants(
    originalProps,
    input.variantKeys
  )

  const {
    ref,
    label,
    baseRef,
    wrapperRef,
    description,
    className,
    classNames,
    startContent,
    endContent,
    onClear,
    innerWrapperRef: innerWrapperRefProp,
    onValueChange = () => {},
    ...otherProps
  } = props

  const handleValueChange = useCallback(
    (value: string | undefined) => {
      onValueChange(value ?? '')
    },
    [onValueChange]
  )

  const [isFocusWithin, setFocusWithin] = useState(false)

  const disableAnimation =
    originalProps.disableAnimation ?? globalContext?.disableAnimation ?? false

  const inputRef = useNativeRef<T & { value?: string }>(ref)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = props.defaultValue ?? props.value ?? ''
    }
  }, [])

  const baseNativeRef = useNativeRef<View>(baseRef)
  const inputWrapperRef = useNativeRef<View>(wrapperRef)
  const innerWrapperRef = useNativeRef<View>(innerWrapperRefProp)

  const [inputValue, setInputValue] = useControlledState<string | undefined>(
    props.value,
    props.defaultValue ?? '',
    handleValueChange
  )

  const isFilled = !isEmpty(inputValue)
  const isFilledWithin = isFilled || isFocusWithin
  const isUnderlined = originalProps.variant === 'underlined'

  const baseStyles = clsx(
    classNames?.base,
    className,
    isFilled ? 'is-filled' : ''
  )

  const handleClear = useCallback(() => {
    setInputValue('')
    onClear?.()
  }, [onClear, setInputValue])

  const inputProps = useFormControl({
    isDisabled: !!originalProps?.isDisabled,
    isInvalid: !!originalProps?.isInvalid,
    isReadOnly: !!originalProps?.isReadOnly,
    isRequired: !!originalProps?.isRequired,
    id: originalProps?.id,
  })

  const { pressProps: clearPressProps } = usePress({
    isDisabled: !!originalProps?.isDisabled || !!originalProps?.isReadOnly,
    onPress: handleClear,
  })

  const labelPlacement = useMemo<InputVariantProps['labelPlacement']>(() => {
    if (
      (!originalProps.labelPlacement ||
        originalProps.labelPlacement === 'inside') &&
      !label
    ) {
      return 'outside'
    }

    return originalProps.labelPlacement ?? 'inside'
  }, [])

  const errorMessage =
    typeof props.errorMessage === 'string' && props.errorMessage
  const isClearable = !!onClear || originalProps.isClearable
  const hasElements = !!label || !!description || !!errorMessage
  const hasPlaceholder = !!props.placeholder
  const hasLabel = !!label
  const hasHelper = !!description || !!errorMessage
  const shouldLabelBeOutside =
    labelPlacement === 'outside' || labelPlacement === 'outside-left'
  const shouldLabelBeInside = labelPlacement === 'inside'
  const isPlaceholderShown = inputRef.current
    ? (!inputRef.current.value ||
        inputRef.current.value === '' ||
        !inputValue ||
        inputValue === '') &&
      hasPlaceholder
    : false
  const isOutsideLeft = labelPlacement === 'outside-left'

  const hasStartContent = !!startContent
  const isLabelOutside = shouldLabelBeOutside
    ? labelPlacement === 'outside-left' ||
      hasPlaceholder ||
      (labelPlacement === 'outside' && hasStartContent)
    : false
  const isLabelOutsideAsPlaceholder =
    labelPlacement === 'outside' && !hasPlaceholder && !hasStartContent

  const slots = useMemo(
    () =>
      input({
        ...variantProps,
        isInvalid: originalProps.isInvalid,
        labelPlacement,
        isClearable,
        disableAnimation,
      }),
    [
      objectToDeps(variantProps),
      originalProps.isInvalid,
      labelPlacement,
      isClearable,
      hasStartContent,
      disableAnimation,
    ]
  )

  const getBaseProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        'ref': baseNativeRef,
        'onPress': () => inputRef.current?.focus(),
        'className': slots.base({ class: baseStyles }),
        'filled': isFilled || hasPlaceholder,
        'filled-within':
          isFilledWithin ||
          hasPlaceholder ||
          hasStartContent ||
          isPlaceholderShown,
        'has-start-content': hasStartContent,
        'has-end-content': !!endContent,
        'focus': isFocusWithin,
        'has-elements': hasElements,
        'has-helper': hasHelper,
        'has-label': hasLabel,
        'has-value': !isPlaceholderShown,
        ...props,
      }
    },
    [
      slots,
      baseStyles,
      isFilled,
      isFocusWithin,
      isFilledWithin,
      hasStartContent,
      isPlaceholderShown,
      hasHelper,
      hasElements,
      hasLabel,
    ]
  )

  const getLabelProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        className: slots.label({ class: classNames?.label }),
        style: { transformOrigin: 'left top' },
        ...props,
      }
    },
    [slots, classNames?.label]
  )

  const getInputProps: PropGetter<
    Record<string, unknown>,
    TextInputProps
  > = useCallback(
    (props = {}) => {
      return {
        ref: inputRef,
        value: inputValue,
        className: slots.input({ class: classNames?.input }),
        placeholder: originalProps.placeholder,
        onFocus: () => setFocusWithin(true),
        onBlur: () => setFocusWithin(false),
        ...mergeProps(inputProps, otherProps, props),
        onChangeText: chain(setInputValue, onValueChange, (value: string) => {
          if (inputRef.current) {
            inputRef.current.value = value
          }
        }),
      }
    },
    [
      slots,
      classNames?.input,
      inputValue,
      inputProps,
      otherProps,
      onValueChange,
    ]
  )

  const getInputWrapperProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ref: inputWrapperRef,
        className: slots.inputWrapper({ class: classNames?.inputWrapper }),
        ...props,
      }
    },
    [slots, classNames?.inputWrapper]
  )

  const getInnerWrapperProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ref: innerWrapperRef,
        className: slots.innerWrapper({ class: classNames?.innerWrapper }),
        ...props,
      }
    },
    [slots, classNames?.innerWrapper]
  )

  const getMainWrapperProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        className: slots.mainWrapper({ class: classNames?.mainWrapper }),
        ...props,
      }
    },
    [slots, classNames?.mainWrapper]
  )

  const getHelperWrapperProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        className: slots.helperWrapper({ class: classNames?.helperWrapper }),
        ...props,
      }
    },
    [slots, classNames?.helperWrapper]
  )

  const getDescriptionProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        className: slots.description({ class: classNames?.description }),
        ...props,
      }
    },
    [slots, classNames?.description]
  )

  const getErrorMessageProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        className: slots.errorMessage({ class: classNames?.errorMessage }),
        ...props,
      }
    },
    [slots, classNames?.errorMessage]
  )

  const getClearButtonProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ...clearPressProps,
        role: 'button',
        className: slots.clearButton({ class: classNames?.clearButton }),
        disabled: originalProps.isDisabled,
        ...props,
      }
    },
    [slots, classNames?.clearButton, clearPressProps]
  )

  const getUnderlineProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        className: slots.underline({ class: classNames?.underline }),
        style: { transformOrigin: 'center' },
        ...props,
      }
    },
    [slots, classNames?.underline]
  )

  return {
    slots,
    classNames,
    // domRef,
    label,
    description,
    startContent,
    endContent,
    labelPlacement,
    isClearable,
    hasHelper,
    hasStartContent,
    isLabelOutside,
    isOutsideLeft,
    isLabelOutsideAsPlaceholder,
    shouldLabelBeOutside,
    shouldLabelBeInside,
    hasPlaceholder,
    isInvalid: originalProps.isInvalid,
    errorMessage,
    isUnderlined,
    getBaseProps,
    getLabelProps,
    getInputProps,
    getInputWrapperProps,
    getInnerWrapperProps,
    getMainWrapperProps,
    getHelperWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
    getClearButtonProps,
    getUnderlineProps,
  }
}
