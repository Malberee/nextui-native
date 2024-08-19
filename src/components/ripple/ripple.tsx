import React, { type FC } from 'react'

import RippleItem from './ripple-item'
import type { RippleProps } from './ripple.types'

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
