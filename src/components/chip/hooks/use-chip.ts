import { mapPropsVariants } from '@/core/system-rsc'
import { chip } from '@/core/theme/components/chip'
import { objectToDeps } from '@/utilities'
import clsx from 'clsx'
import { type ReactNode, cloneElement, isValidElement, useMemo } from 'react'

import type { UseChipProps } from '../chip.types'

export const useChip = (originalProps: UseChipProps) => {
  const [props, variantProps] = mapPropsVariants(
    originalProps,
    chip.variantKeys
  )

  const {
    children,
    startContent,
    endContent,
    onClose,
    classNames,
    className,
    ...otherProps
  } = props

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
