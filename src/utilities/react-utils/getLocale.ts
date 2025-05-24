import { I18nManager } from 'react-native'

export const getLocale = () => {
  const locale = I18nManager.getConstants().localeIdentifier ?? 'en-US'

  return locale.replace('_', '-')
}
