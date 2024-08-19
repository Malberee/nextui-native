import { clamp } from '@/utilities'
import { type Key, useEffect } from 'react'
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import type { RippleType } from '../ripple.types'

export const useRippleAnimation = (
  ripple: RippleType,
  color: string,
  onClear: (key: Key) => void
) => {
  const scale = useSharedValue(0)
  const opacity = useSharedValue(0.35)

  const duration =
    clamp(0.01 * ripple.size, 0.2, ripple.size > 100 ? 0.75 : 0.5) * 1000

  useEffect(() => {
    scale.value = withTiming(1, { duration })
    opacity.value = withTiming(0, { duration })

    setTimeout(() => {
      onClear(ripple.key)
    }, duration)
  }, [])

  const animatedStyles = useAnimatedStyle(() => ({
    width: ripple.size * 2,
    height: ripple.size * 2,
    backgroundColor: color,
    borderRadius: ripple.size,
    position: 'absolute',
    top: ripple.y - ripple.size,
    left: ripple.x - ripple.size,
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }))

  return animatedStyles
}
