import { createContext } from '@/utilities'

import type { ContextType } from './button.types'

export const [ButtonGroupProvider, useButtonGroupContext] =
  createContext<ContextType>({ name: 'ButtonGroupContext', strict: false })
