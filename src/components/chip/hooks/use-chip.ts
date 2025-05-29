import { type RNHeroUIProps, mapPropsVariants } from '@/core/system-rsc'
import {
  type ChipSlots,
  type ChipVariantProps,
  type SlotsToClasses,
  chip,
} from '@/core/theme'
import { type ReactRef, objectToDeps, useNativeRef } from '@/utilities'
import clsx from 'clsx'
import { type ReactNode, cloneElement, isValidElement, useMemo } from 'react'
import type { GestureResponderEvent, View } from 'react-native'

export interface UseChipProps extends RNHeroUIProps, ChipVariantProps {
  /**
   * Ref to the React Native component.
   */
  ref?: ReactRef<View | null>
  /**
   * Element to be rendered in the left side of the chip.
   * this props overrides the `avatar` prop.
   */
  startContent?: ReactNode
  /**
   * Element to be rendered in the right side of the chip.
   * if you pass this prop and the `onClose` prop, the passed element
   * will have the close button props and it will be rendered instead of the
   * default close button.
   */
  endContent?: ReactNode
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Chip classNames={{
   *    base:"base-classes",
   *    dot: "dot-classes",
   *    content: "content-classes",
   *    avatar: "avatar-classes",
   *    closeButton: "close-button-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<ChipSlots>
  className?: string
  /**
   * Callback fired when the chip is closed. if you pass this prop,
   * the chip will display a close button (endContent).
   * @param e PressEvent
   */
  onClose?: (e: GestureResponderEvent) => void
}

export const useChip = (originalProps: UseChipProps) => {
  const [props, variantProps] = mapPropsVariants(
    originalProps,
    chip.variantKeys
  )

  const {
    ref,
    children,
    startContent,
    endContent,
    onClose,
    classNames,
    className,
    ...otherProps
  } = props

  const baseRef = useNativeRef(ref)

  const baseStyles = clsx(classNames?.base, className)

  const isCloseable = !!onClose
  const isDotVariant = originalProps.variant === 'dot'

  const isOneChar = useMemo(
    () => typeof children === 'string' && children?.length === 1,
    [children]
  )

  const hasStartContent = useMemo(() => !!startContent, [startContent])
  const hasEndContent = useMemo(
    () => !!endContent || isCloseable,
    [endContent, isCloseable]
  )

  const slots = useMemo(
    () =>
      chip({
        ...variantProps,
        hasStartContent,
        hasEndContent,
        isOneChar,
        isCloseable,
      }),
    [
      objectToDeps(variantProps),
      hasStartContent,
      hasEndContent,
      isOneChar,
      isCloseable,
    ]
  )

  const getChipProps = () => ({
    ref: baseRef,
    className: slots.base({ class: baseStyles }),
    ...otherProps,
  })

  const getContentClone = (content: ReactNode) =>
    isValidElement(content)
      ? cloneElement(content, {
          // @ts-ignore
          className: clsx('max-h-[80%]', content.props.className),
        })
      : null

  return {
    children,
    slots,
    classNames,
    isDot: isDotVariant,
    isCloseable,
    startContent: getContentClone(startContent),
    endContent: getContentClone(endContent),
    onClose,
    getChipProps,
  }
}
