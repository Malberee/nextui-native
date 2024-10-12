import { CloseFilledIcon } from '@/utilities/shared-icons'
import { cssInterop } from 'nativewind'
import React, { forwardRef, useMemo } from 'react'
import { Pressable, Text, View } from 'react-native'

import type { ChipProps } from './chip.types'
import { useChip } from './hooks/use-chip'

cssInterop(CloseFilledIcon, {
  className: {
    target: false,
    nativeStyleToProp: {
      color: true,
    },
  },
})

const Chip = forwardRef<View, ChipProps>((props, ref) => {
  const {
    children,
    slots,
    classNames,
    isDot,
    isCloseable,
    startContent,
    endContent,
    onClose,
    getChipProps,
  } = useChip(props)

  const start = useMemo(() => {
    if (isDot && !startContent) {
      return <View className={slots.dot({ class: classNames?.dot })} />
    }

    return startContent
  }, [slots, startContent, isDot])

  const end = useMemo(() => {
    if (isCloseable) {
      return (
        <Pressable
          className={slots.closeButton({ class: classNames?.closeButton })}
          onPress={onClose}
          role="button"
        >
          {endContent || (
            <CloseFilledIcon
              className={slots.content({ class: 'size-4 p-0' })}
            />
          )}
        </Pressable>
      )
    }

    return endContent
  }, [slots, endContent, isCloseable])

  return (
    <View ref={ref} {...getChipProps()}>
      {start}
      <Text className={slots.content({ class: classNames?.content })}>
        {children}
      </Text>
      {end}
    </View>
  )
})

Chip.displayName = 'NextUI.Chip'

export default Chip
