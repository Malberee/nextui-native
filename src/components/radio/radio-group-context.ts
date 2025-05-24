import { createContext } from '@/utilities'

import type { ContextType } from './hooks/use-radio-group'

export const [RadioGroupProvider, useRadioGroupContext] =
  createContext<ContextType>({
    name: 'RadioGroupContext',
    strict: false,
  })
