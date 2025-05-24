import { useEffect } from 'react'
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

export const useIndeterminateAnimation = (width: number) => {
  const translateX = useSharedValue(-width)
  const scaleX = useSharedValue(0)

  useEffect(() => {
    translateX.value = -width

    if (width) {
      scaleX.value = 0.2

      translateX.value = withRepeat(
        withTiming(width, {
          duration: 1500,
          easing: Easing.bezier(0.65, 0.815, 0.735, 0.395),
        }),
        0
      )
      scaleX.value = withRepeat(
        withTiming(1, {
          duration: 1500,
          easing: Easing.bezier(0.65, 0.815, 0.735, 0.395),
        }),
        0
      )
    }
  }, [width])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { scaleX: scaleX.value }],
    }
  })

  return animatedStyle
}
