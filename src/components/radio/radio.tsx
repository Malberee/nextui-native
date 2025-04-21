import React, { forwardRef } from 'react'
import { Pressable, Text, View } from 'react-native'

import { type UseRadioProps, useRadio } from './hooks/use-radio'

export interface RadioProps extends UseRadioProps {}

const Radio = forwardRef<View, RadioProps>((props, ref) => {
  const {
    children,
    description,
    getBaseProps,
    getWrapperProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
    getDescriptionProps,
  } = useRadio({ ...props, ref })

  return (
    <Pressable {...getBaseProps()}>
      <View {...getWrapperProps()}>
        <View {...getControlProps()} />
      </View>
      <View {...getLabelWrapperProps()}>
        {children && <Text {...getLabelProps()}>{children}</Text>}
        {description && <Text {...getDescriptionProps()}>{description}</Text>}
      </View>
    </Pressable>
  )
})

Radio.displayName = 'NextUI.Radio'

export default Radio
