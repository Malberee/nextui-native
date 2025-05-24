import { getUniqueID } from '@/utilities'
import { type Key, useState } from 'react'
import type { GestureResponderEvent } from 'react-native'

export type RippleType = {
  key: Key
  x: number
  y: number
  size: number
}

export interface UseRippleProps {}

export const useRipple = (parentWidth: number, parentHeight: number) => {
  const [ripples, setRipples] = useState<RippleType[]>([])

  const size = Math.max(parentWidth, parentHeight)

  const onPress = (event: GestureResponderEvent) => {
    const x = event.nativeEvent.locationX ?? parentWidth / 2
    const y = event.nativeEvent.locationY ?? parentHeight / 2

    setRipples((prevRipples) => [
      ...prevRipples,
      { key: getUniqueID(ripples.length.toString()), x, y, size },
    ])
  }

  const onClear = (key: Key) => {
    setRipples((prevState) => prevState.filter((ripple) => ripple.key !== key))
  }

  return { ripples, onPress, onClear }
}
