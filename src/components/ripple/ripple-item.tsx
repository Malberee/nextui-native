import { type FC, type Key } from 'react'
import Animated from 'react-native-reanimated'

import type { RippleType } from './hooks'
import { useRippleAnimation } from './hooks/use-ripple-animation'

export interface RippleItemProps {
  ripple: RippleType
  color: string
  onClear: (key: Key) => void
}

const RippleItem: FC<RippleItemProps> = ({ ripple, color, onClear }) => {
  const animatedStyles = useRippleAnimation(ripple, color, onClear)

  return <Animated.View style={animatedStyles} />
}

export default RippleItem
