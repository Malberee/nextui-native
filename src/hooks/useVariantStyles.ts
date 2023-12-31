import useColors from '../components/ThemeProvider/hooks/useColors'
import { VariantName, ColorName } from '../types'

export const useVariantStyles = (
  variant: VariantName | 'dot',
  color: ColorName,
) => {
  const { colors } = useColors()

  switch (variant) {
    case 'flat':
      return `
            background-color: ${colors[color]}33;
        `
      break
    case 'dot':
      return `
            border-color: ${colors.default200};
            border-width: 2px;
        `
      break
    case 'faded':
      return `
            background-color: ${colors.default100};
            border-color: ${colors.default200};
            border-width: 2px;
        `
      break
    case 'bordered':
      return `
            border-color: ${colors[color]};
            border-width: 2px;
        `
      break
    case 'light':
      return
      break
    default:
      return `
            background-color: ${colors[color]};
        `
      break
  }
}
