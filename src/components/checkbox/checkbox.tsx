import { cssInterop } from 'nativewind'
import { type ReactElement, cloneElement, forwardRef } from 'react'
import { Pressable, Text, View } from 'react-native'

import { CheckboxIcon } from './checkbox-icon'
import { type UseCheckboxProps, useCheckbox } from './hooks/use-checkbox'

cssInterop(CheckboxIcon, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      color: true,
    },
  },
})

export interface CheckboxProps extends UseCheckboxProps {}

const Checkbox = forwardRef<View, CheckboxProps>((props, ref) => {
  const {
    children,
    slots,
    icon = <CheckboxIcon />,
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

Checkbox.displayName = 'HeroUI.Checkbox'

export default Checkbox
