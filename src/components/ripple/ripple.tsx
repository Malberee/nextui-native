import type { RNHeroUIProps } from '@/core/system-rsc'
import { type FC, type Key } from 'react'

import type { RippleType } from './hooks'
import RippleItem from './ripple-item'

export interface RippleProps extends RNHeroUIProps {
  ripples: RippleType[]
  color: string
  onClear: (key: Key) => void
}

const Ripple: FC<RippleProps> = ({ ripples, color = 'white', onClear }) => {
  return (
    <>
      {ripples.map((ripple) => (
        <RippleItem
          key={ripple.key}
          color={color}
          onClear={onClear}
          ripple={ripple}
        />
      ))}
    </>
  )
}

Ripple.displayName = 'HeroUI.Ripple'

export default Ripple
