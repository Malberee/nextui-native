import { useProviderContext } from '@/core'
import {
  type PropGetter,
  type RNHeroUIProps,
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
  extends Omit<RNHeroUIProps<typeof TextInput>, keyof InputVariantProps> {
  /**
   * Ref to the React Native component.
   */
  ref?: Ref<T>
  /**
   * Ref to the container.
   */
  baseRef?: Ref<View>
  /**
   * Ref to the input wrapper.
   * This is the element that wraps the input label and the innerWrapper when the labelPlacement="inside"
   * and the input has start/end content.
   */
  wrapperRef?: Ref<View>
  /**
   * Ref to the input inner wrapper.
   * This is the element that wraps the input and the start/end content when passed.
   */
  innerWrapperRef?: Ref<View>
  /**
   * Element to be rendered in the left side of the input.
   */
  startContent?: React.ReactNode
  /**
   * Element to be rendered in the right side of the input.
   * if you pass this prop and the `onClear` prop, the passed element
   * will have the clear button props and it will be rendered instead of the
   * default clear button.
   */
  endContent?: React.ReactNode
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Input classNames={{
   *    base:"base-classes",
   *    label: "label-classes",
   *    mainWrapper: "main-wrapper-classes",
   *    inputWrapper: "input-wrapper-classes",
   *    innerWrapper: "inner-wrapper-classes",
   *    input: "input-classes",
   *    clearButton: "clear-button-classes",
   *    helperWrapper: "helper-wrapper-classes",
   *    description: "description-classes",
   *    errorMessage: "error-message-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<InputSlots>
  className?: string
  /**
   * Callback fired when the value is cleared.
   * if you pass this prop, the clear button will be shown.
   */
  onClear?: () => void
  /**
   * React aria onChange event.
   */
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
        style: { transformOrigin: [0, 0, 0] },
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
        ...mergeProps(inputProps, otherProps, props),
        onFocus: chain(() => setFocusWithin(true), originalProps.onFocus),
        onBlur: chain(() => setFocusWithin(false), originalProps.onBlur),
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
        style: { transformOrigin: ['50%', '50%', 0] },
        ...props,
      }
    },
    [slots, classNames?.underline]
  )

  return {
    slots,
    classNames,
    baseRef,
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
