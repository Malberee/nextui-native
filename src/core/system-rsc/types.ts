import type { ComponentType } from 'react'
import type { View, ViewProps } from 'react-native'

export type PropGetter<P = Record<string, unknown>, R = ViewProps> = (
  props?: P & ViewProps,
  ref?: React.Ref<any>
) => R & React.RefAttributes<any>

type PropsOf<T extends ComponentType<any>> = React.ComponentPropsWithoutRef<T>

export type RNNextUIProps<
  T extends ComponentType<any> = typeof View,
  OmitKeys extends keyof any = never,
> = Omit<
  PropsOf<T>,
  | 'ref'
  | 'color'
  | 'slot'
  | 'size'
  | 'defaultChecked'
  | 'defaultValue'
  | OmitKeys
>
