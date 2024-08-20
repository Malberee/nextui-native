import { cn } from '@/core/theme'
import React, { type FC } from 'react'
import { View } from 'react-native'

import { ButtonGroupProvider } from './button-group-context'
import type { ButtonGroupProps } from './button.types'
import { useButtonGroup } from './hooks/use-button-group'

const ButtonGroup: FC<ButtonGroupProps> = (props) => {
  const { children, context, classNames, ...otherProps } = useButtonGroup(props)

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
      <View className={classNames} {...otherProps}>
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
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

ButtonGroup.displayName = 'NextUI.ButtonGroup'

export default ButtonGroup
