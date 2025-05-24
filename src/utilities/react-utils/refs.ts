import React, {
  type Ref,
  type RefObject,
  useImperativeHandle,
  useRef,
} from 'react'
import type { View } from 'react-native'

export type ReactRef<T> =
  | React.RefObject<T>
  | React.MutableRefObject<T>
  | React.Ref<T>

export function useNativeRef<T extends View = View>(
  ref?: RefObject<T | null> | Ref<T | null>
) {
  const nativeRef = useRef<T>(null)

  useImperativeHandle(ref, () => nativeRef.current)

  return nativeRef
}
