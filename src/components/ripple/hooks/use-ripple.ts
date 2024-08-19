import { getUniqueID } from '@/utilities'
import { type Key, useState } from 'react'
import type { GestureResponderEvent } from 'react-native'

import type { RippleType } from '../ripple.types'

export const useRipple = (size: number) => {
  const [ripples, setRipples] = useState<RippleType[]>([])

  const onPress = (event: GestureResponderEvent) => {
    const x = event.nativeEvent.locationX
    const y = event.nativeEvent.locationY

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
