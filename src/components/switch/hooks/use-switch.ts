import { useProviderContext } from '@/core'
import { type PropGetter, mapPropsVariants } from '@/core/system-rsc'
import { toggle } from '@/core/theme'
import { objectToDeps } from '@/utilities'
import clsx from 'clsx'
import { useEffect, useMemo, useState } from 'react'

import type { UseSwitchProps } from '../switch.types'

export const useSwitch = (originalProps: UseSwitchProps = {}) => {
  const globalContext = useProviderContext()

  const [props, variantProps] = mapPropsVariants(
    originalProps,
    toggle.variantKeys
  )

  const {
    value: valueProp,
    startContent,
    endContent,
    defaultSelected,
    children,
    thumbIcon,
    className,
    classNames,
    onValueChange,
    ...otherProps
  } = props

  const disableAnimation =
    originalProps.disableAnimation ?? globalContext?.disableAnimation ?? false

  const [isSelected, setIsSelected] = useState(!!defaultSelected)

  const value = valueProp ?? isSelected

  useEffect(() => {
    if (onValueChange) {
      onValueChange(isSelected)
    }
  }, [isSelected])

  const slots = useMemo(
    () => toggle({ ...variantProps, isSelected: value }),
    [objectToDeps(variantProps), value, disableAnimation]
  )

  const baseStyles = clsx(classNames?.base, className)

  const getBaseProps: PropGetter = (props) => ({
    className: slots.base({ class: clsx(baseStyles, props?.className) }),
    onPress: () => setIsSelected((prevState) => !prevState),
  })

  return {
    children,
    slots,
    classNames,
    thumbIcon,
    startContent,
    endContent,
    isSelected,
    getBaseProps,
    ...otherProps,
  }
}
