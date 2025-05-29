import type { RNNextUIProps } from '@/core/system-rsc'
import { type FC, type Key } from 'react'

import type { RippleType } from './hooks'
import RippleItem from './ripple-item'

export interface RippleProps extends RNNextUIProps {
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

Ripple.displayName = 'NextUI.Ripple'

export default Ripple
