import { forwardRef } from 'react'
import { Pressable, Text, View } from 'react-native'

import { Ripple } from '../ripple'
import { Spinner } from '../spinner'
import { type UseButtonProps, useButton } from './hooks'

export interface ButtonProps extends UseButtonProps {}

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
    disableRipple,
    getRippleProps,
    getButtonProps,
  } = useButton({ ...props, ref })

  return (
    <Pressable {...getButtonProps()}>
      {startContent}
      {isLoading && spinnerPlacement === 'start' && spinner}
      {isLoading && isIconOnly ? null : children ? (
        <Text className={slots.content({ class: classNames?.content })}>
          {children}
        </Text>
      ) : null}
      {isLoading && spinnerPlacement === 'end' && spinner}
      {endContent}
      {!disableRipple && <Ripple {...getRippleProps()} />}
    </Pressable>
  )
})

Button.displayName = 'HeroUI.Button'

export default Button
