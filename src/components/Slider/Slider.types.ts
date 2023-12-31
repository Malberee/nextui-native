import { ReactNode } from 'react'
import { ColorName, FormatOptions, RadiusName, SizeName } from '../../types'

export type SliderStepMarks = {
  value: number
  label: string
}[]

export interface SliderProps {
  label?: ReactNode
  name?: string
  size?: Extract<SizeName, 'sm' | 'md' | 'lg'>
  color?: ColorName
  radius?: RadiusName
  step?: number
  value?: number
  defaultValue?: number
  minValue?: number
  maxValue?: number
  orientation?: 'horizontal' | 'vertical'
  fillOffset?: number
  showSteps?: boolean
  showTooltip?: boolean
  marks?: SliderStepMarks
  startContent?: ReactNode
  endContent?: ReactNode
  formatOptions?: FormatOptions
  showOutline?: boolean
  hideValue?: boolean
  hideThumb?: boolean
  disableThumbScale?: boolean
  isDisabled?: boolean
  disableAnimation?: boolean

  // events
  onValueChange?: (value: number) => void
  onValueChangeEnd?: (value: number) => void
}

export interface SliderContextProps
  extends Required<
    Omit<
      SliderProps,
      | 'label'
      | 'name'
      | 'value'
      | 'fillOffset'
      | 'marks'
      | 'startContent'
      | 'endContent'
      | 'formatOptions'
      | 'tooltipValueFormatOptions'
      | 'tooltipProps'
      | 'onValueChange'
      | 'onValueChangeEnd'
    >
  > {}
