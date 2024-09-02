import { cssInterop } from 'nativewind'
import React, { type ReactElement, cloneElement, forwardRef } from 'react'
import { Pressable, Text, View } from 'react-native'

import { CheckboxIcon } from './checkbox-icon'
import type { CheckboxProps } from './checkbox.types'
import { useCheckbox } from './hooks/use-checkbox'

cssInterop(CheckboxIcon, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      color: true,
    },
  },
})

const Checkbox = forwardRef<View, CheckboxProps>((props, ref) => {
  const {
    children,
    slots,
    icon = <CheckboxIcon className={slots.icon()} />,
    getBaseProps,
    getWrapperProps,
    getIconProps,
    getLabelProps,
  } = useCheckbox({ ...props, ref })

  const clonedIcon =
    typeof icon === 'function'
      ? icon(getIconProps())
      : cloneElement(icon as ReactElement, getIconProps())

  return (
    <Pressable {...getBaseProps()}>
      <View {...getWrapperProps()}>
        <View className={slots.mark()}>{clonedIcon}</View>
      </View>
      {children && (
        <View className={slots.labelWrapper()}>
          <Text {...getLabelProps()}>{children}</Text>
          <View className={slots.line()} />
        </View>
      )}
    </Pressable>
  )
})

Checkbox.displayName = 'NextUI.Checkbox'

export default Checkbox
