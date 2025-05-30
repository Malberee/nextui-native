import { type FC, type ReactNode, useMemo } from 'react'

import { ProviderContext, type ProviderContextProps } from './provider-context'

export interface HeroUIProviderProps extends ProviderContextProps {
  children: ReactNode
}

export const HeroUIProvider: FC<HeroUIProviderProps> = ({
  children,
  disableRipple,
  disableAnimation,
}) => {
  const context = useMemo<ProviderContextProps>(
    () => ({ disableRipple, disableAnimation }),
    [disableAnimation, disableRipple]
  )
  return <ProviderContext value={context}>{children}</ProviderContext>
}
