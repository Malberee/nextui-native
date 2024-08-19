import type { Key } from 'react'

export interface RippleProps {
  ripples: RippleType[]
  color: string
  onClear: (key: Key) => void
}

export interface IRippleItemProps {
  ripple: RippleType
  color: string
  onClear: (key: Key) => void
}

export type RippleType = {
  key: Key
  x: number
  y: number
  size: number
}
