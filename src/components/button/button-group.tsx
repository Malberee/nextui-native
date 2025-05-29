import { cn } from '@/core/theme'
import React, { type FC, type ReactElement } from 'react'
import { View } from 'react-native'

import type { ButtonProps } from './button'
import { ButtonGroupProvider } from './button-group-context'
import { type UseButtonGroupProps, useButtonGroup } from './hooks'

export interface ButtonGroupProps extends UseButtonGroupProps {}

const ButtonGroup: FC<ButtonGroupProps> = (props) => {
  const { baseRef, children, context, classNames, getButtonGroupProps } =
    useButtonGroup(props)

  const isFirstElement = (index: number) => index === 0
  const isLastElement = (index: number) =>
    index === React.Children.count(children) - 1

  const getRoundedStyles = (index: number) => {
    if (isFirstElement(index)) {
      return 'rounded-r-none'
    }
    if (isLastElement(index)) {
      return 'rounded-l-none'
    }

    return 'rounded-none'
  }

  return (
    <ButtonGroupProvider value={context}>
      <View ref={baseRef} className={classNames} {...getButtonGroupProps()}>
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as ReactElement<ButtonProps>, {
              classNames: {
                base: cn(
                  getRoundedStyles(index),
                  context.fullWidth && 'flex-1 w-auto',
                  child.props.classNames?.base
                ),
              },
            })
          }
          return null
        })}
      </View>
    </ButtonGroupProvider>
  )
}

ButtonGroup.displayName = 'HeroUI.ButtonGroup'

export default ButtonGroup
