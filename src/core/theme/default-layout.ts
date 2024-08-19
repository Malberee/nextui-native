import type { LayoutTheme } from './types'

export const defaultLayout: LayoutTheme = {
  dividerWeight: '1px',
  disabledOpacity: '.5',
  fontSize: {
    tiny: '0.75rem',
    small: '0.875rem',
    medium: '1rem',
    large: '1.125rem',
  },
  lineHeight: {
    tiny: '1rem',
    small: '1.25rem',
    medium: '1.5rem',
    large: '1.75rem',
  },
  radius: {
    small: '8px',
    medium: '12px',
    large: '14px',
  },
  borderWidth: {
    small: '1px',
    medium: '2px',
    large: '3px',
  },
}

export const lightLayout: LayoutTheme = {
  hoverOpacity: '.8',
}

export const darkLayout: LayoutTheme = {
  hoverOpacity: '.9',
}
