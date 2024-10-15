import React, { type ReactElement, cloneElement, forwardRef } from 'react'
import { Pressable, Text, View } from 'react-native'

import { type UseSwitchProps, useSwitch } from './hooks/use-switch'

export interface SwitchProps extends UseSwitchProps {}

const Switch = forwardRef<View, SwitchProps>((props, ref) => {
  const {
    children,
    startContent,
    endContent,
    thumbIcon,
    getBaseProps,
    getWrapperProps,
    getLabelProps,
    getThumbProps,
    getThumbIconProps,
    getStartContentProps,
    getEndContentProps,
  } = useSwitch({ ...props, ref })

  const clonedThumbIcon =
    typeof thumbIcon === 'function'
      ? thumbIcon(getThumbIconProps({ includeStateProps: true }))
      : thumbIcon &&
        cloneElement(thumbIcon as ReactElement, getThumbIconProps())

  const clonedStartContent =
    startContent &&
    cloneElement(startContent as ReactElement, getStartContentProps())

  const clonedEndContent =
    endContent && cloneElement(endContent as ReactElement, getEndContentProps())

  return (
    <Pressable {...getBaseProps()}>
      <View {...getWrapperProps()}>
        {startContent && clonedStartContent}
        <View {...getThumbProps()}>{thumbIcon && clonedThumbIcon}</View>
        {endContent && clonedEndContent}
      </View>
      {children && <Text {...getLabelProps()}>{children}</Text>}
    </Pressable>
  )
})

Switch.displayName = 'NextUI.Switch'

export default Switch
