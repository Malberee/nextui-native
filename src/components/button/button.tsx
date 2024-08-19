import React, { forwardRef } from 'react'
import { Pressable, Text, View } from 'react-native'

import Ripple from '../ripple'
import Spinner from '../spinner'
import type { ButtonProps } from './button.types'
import { useButton } from './hooks/use-button'

const Button = forwardRef<View, ButtonProps>((props, ref) => {
  const {
    children,
    slots,
    classNames,
    startContent,
    endContent,
    isLoading,
    spinnerSize,
    spinner = (
      <Spinner
        classNames={{
          circle1: slots.content({ class: classNames?.content }),
          circle2: slots.content({ class: classNames?.content }),
        }}
        size={spinnerSize}
      />
    ),
    spinnerPlacement,
    isIconOnly,
    isDisabled,
    disableRipple,
    onPress,
    getRippleProps,
    onLayout,
    ...otherProps
  } = useButton(props)

  return (
    <Pressable
      ref={ref}
      onPress={onPress}
      onLayout={onLayout}
      disabled={isDisabled || isLoading}
      className={slots.base({ class: classNames?.base })}
      {...otherProps}
    >
      {startContent}
      {isLoading && spinnerPlacement === 'start' && spinner}
      {isLoading && isIconOnly ? null : (
        <Text className={slots.content({ class: classNames?.content })}>
          {children}
        </Text>
      )}
      {isLoading && spinnerPlacement === 'end' && spinner}
      {endContent}
      {!disableRipple && <Ripple {...getRippleProps()} />}
    </Pressable>
  )
})

Button.displayName = 'NextUI.Button'

export default Button
