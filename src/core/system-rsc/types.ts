import { type ViewProps } from 'react-native'

export type PropGetter<P = Record<string, unknown>, R = ViewProps> = (
  props?: P & ViewProps,
  ref?: React.Ref<any>
) => R & React.RefAttributes<any>
