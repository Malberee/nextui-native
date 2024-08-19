import React, { type FC } from 'react'
import Animated from 'react-native-reanimated'

import { useRippleAnimation } from './hooks/use-ripple-animation'
import type { IRippleItemProps } from './ripple.types'

const RippleItem: FC<IRippleItemProps> = ({ ripple, color, onClear }) => {
  const animatedStyles = useRippleAnimation(ripple, color, onClear)

  return <Animated.View style={animatedStyles} />
}

export default RippleItem
