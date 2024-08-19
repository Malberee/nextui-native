import {
  type ThemeColors,
  commonColors,
  semanticColors,
} from '@/core/theme/colors'
import type { Variant } from '@/types'
import { useColorScheme } from 'nativewind'

export const useRippleColor = (variant: Variant, color: keyof ThemeColors) => {
  const { colorScheme } = useColorScheme()

  if (variant === 'solid' || variant === 'shadow' || variant === 'ghost') {
    if (color === 'success' || color === 'warning') {
      return commonColors.black
    }
    return commonColors.white
  }

  return semanticColors[colorScheme || 'dark'][color][500] || commonColors.black
}
