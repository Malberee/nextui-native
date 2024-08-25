import React, { type ReactElement, cloneElement, forwardRef } from 'react'
import { Pressable, Text, View } from 'react-native'

import { useSwitch } from './hooks/use-switch'
import type { SwitchProps } from './switch.types'

const Switch = forwardRef<View, SwitchProps>((props, ref) => {
  const {
    children,
    startContent,
    endContent,
    thumbIcon,
    getBaseProps,
    slots,
    classNames,
  } = useSwitch(props)

  const clonedThumbIcon =
    typeof thumbIcon === 'function'
      ? thumbIcon({
          className: slots.thumbIcon({ class: classNames?.thumbIcon }),
        })
      : thumbIcon &&
        cloneElement(thumbIcon as ReactElement, {
          className: slots.thumbIcon({ class: classNames?.thumbIcon }),
        })

  const clonedStartContent =
    startContent &&
    cloneElement(startContent as ReactElement, {
      className: slots.startContent({ class: classNames?.startContent }),
    })

  const clonedEndContent =
    endContent &&
    cloneElement(endContent as ReactElement, {
      className: slots.endContent({ class: classNames?.endContent }),
    })

  return (
    <Pressable {...getBaseProps()} ref={ref}>
      <View className={slots.wrapper({ class: classNames?.wrapper })}>
        {startContent && clonedStartContent}
        <View className={slots.thumb({ class: classNames?.thumb })}>
          {thumbIcon && clonedThumbIcon}
        </View>
        {endContent && clonedEndContent}
      </View>
      {children && (
        <Text className={slots.label({ class: classNames?.label })}>
          {children}
        </Text>
      )}
    </Pressable>
  )
})

Switch.displayName = 'NextUI.Switch'

export default Switch
