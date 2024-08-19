import { mapPropsVariants } from '@/core/system-rsc'
import { spinner } from '@/core/theme'
import { objectToDeps } from '@/utilities'
import clsx from 'clsx'
import { useMemo } from 'react'

import type { UseSpinnerProps } from '../spinner.types'

export const useSpinner = (originalProps: Omit<UseSpinnerProps, 'ref'>) => {
  const [props, variantProps] = mapPropsVariants(
    originalProps,
    spinner.variantKeys
  )

  const {
    children,
    className,
    classNames,
    label: labelProp,
    ...otherProps
  } = props

  const slots = useMemo(
    () => spinner({ ...variantProps }),
    [objectToDeps(variantProps)]
  )

  const baseStyles = clsx(classNames?.base, className)

  const label = labelProp || children

  const getSpinnerProps = () => ({
    className: slots.base({ class: baseStyles }),
    ...otherProps,
  })

  return {
    size: originalProps.size || 'md',
    label,
    slots,
    classNames,
    getSpinnerProps,
  }
}
