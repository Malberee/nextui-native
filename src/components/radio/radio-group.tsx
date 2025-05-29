import { forwardRef } from 'react'
import { Text, View } from 'react-native'

import { type UseRadioGroupProps, useRadioGroup } from './hooks/use-radio-group'
import { RadioGroupProvider } from './radio-group-context'

export interface RadioGroupProps
  extends Omit<UseRadioGroupProps, 'defaultChecked'> {}

const RadioGroup = forwardRef<View, RadioGroupProps>((props, ref) => {
  const {
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
  } = useRadioGroup({
    ...props,
    ref,
  })

  return (
    <View {...getGroupProps()}>
      {label && <Text {...getLabelProps()}>{label}</Text>}
      <View {...getWrapperProps()}>
        <RadioGroupProvider value={context}>{children}</RadioGroupProvider>
      </View>
      {isInvalid && errorMessage ? (
        <Text {...getErrorMessageProps()}>{`dsf`}</Text>
      ) : description ? (
        <Text {...getDescriptionProps()}>{description}</Text>
      ) : null}
    </View>
  )
})

RadioGroup.displayName = 'NextUI.RadioGroup'

export default RadioGroup
