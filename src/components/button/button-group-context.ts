import { createContext } from '@/utilities'

import type { ContextType } from './hooks'

export const [ButtonGroupProvider, useButtonGroupContext] =
  createContext<ContextType>({ name: 'ButtonGroupContext', strict: false })
