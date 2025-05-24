import { forwardRef, useMemo } from 'react'
import { Text, View } from 'react-native'

import { CheckboxGroupProvider } from './checkbox-group-context'
import {
  type UseCheckboxGroupProps,
  useCheckboxGroup,
} from './hooks/use-checkbox-group'

export interface CheckboxGroupProps extends UseCheckboxGroupProps {}

const CheckboxGroup = forwardRef<View, CheckboxGroupProps>((props, ref) => {
  const {
    children,
    context,
    label,
    description,
    isInvalid,
    errorMessage,
    getGroupProps,
    getLabelProps,
    getWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
  } = useCheckboxGroup({ ...props, ref })

  const errorMessageContent = useMemo(() => errorMessage, [isInvalid])

  return (
    <View {...getGroupProps()}>
      {label && <Text {...getLabelProps()}>{label}</Text>}
      <View {...getWrapperProps()}>
        <CheckboxGroupProvider value={context}>
          {children}
        </CheckboxGroupProvider>
      </View>
      {isInvalid && errorMessageContent ? (
        <Text {...getErrorMessageProps()}>{errorMessageContent}</Text>
      ) : description ? (
        <Text {...getDescriptionProps()}>{description}</Text>
      ) : null}
    </View>
  )
})

CheckboxGroup.displayName = 'NextUI.CheckboxGroup'

export default CheckboxGroup
