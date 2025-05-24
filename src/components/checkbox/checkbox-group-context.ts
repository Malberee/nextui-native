import { createContext } from '@/utilities'

import type { ContextType } from './hooks/use-checkbox-group'

export const [CheckboxGroupProvider, useCheckboxGroupContext] =
  createContext<ContextType>({
    name: 'CheckboxGroupContext',
    strict: false,
  })
