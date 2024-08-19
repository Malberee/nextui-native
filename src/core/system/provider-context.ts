import { createContext } from '@/utilities'

export type ProviderContextProps = {
  disableAnimation?: boolean
  disableRipple?: boolean
}

export const [ProviderContext, useProviderContext] =
  createContext<ProviderContextProps>({
    name: 'ProviderContext',
    strict: false,
  })
