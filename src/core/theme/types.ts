import { type ThemeColors } from './colors/types'

export type DefaultThemeType = 'light' | 'dark'

export type BaseThemeUnit = {
  small?: string
  medium?: string
  large?: string
}

export type FontThemeUnit = BaseThemeUnit & {
  tiny?: string
}

export interface LayoutTheme {
  /**
   * The default font size applied across the components.
   *
   * @default
   * {
   *    tiny: "0.75rem",
   *    small: "0.875rem",
   *    medium: "1rem",
   *    large: "1.125rem",
   *    DEFAULT: "1rem",
   * }
   */
  fontSize?: FontThemeUnit
  /**
   * The default line height applied across the components.
   *
   * @default
   * {
   *    tiny: "1rem",
   *    small: "1.25rem",
   *    medium: "1.5rem",
   *    large: "1.75rem",
   *    DEFAULT: "1.5rem",
   * }1
   */
  lineHeight?: FontThemeUnit
  /**
   * The default radius applied across the components.
   * we recommend to use `rem` units.
   *
   * @default
   * {
   *   small: "0.25rem",
   *   medium: "0.5rem",
   *   large: "0.75rem",
   * }
   */
  radius?: BaseThemeUnit
  /**
   * A number between 0 and 1 that is applied as opacity-[value] when the component is disabled.
   *
   * format: ".[value]"
   *
   * @default .5
   */
  disabledOpacity?: string | number
  /**
   * A number between 0 and 1 that is applied as opacity-[value] when the component is hovered.
   *
   * format: ".[value]"
   *
   * @default .8
   */
  hoverOpacity?: string | number
  /**
   * The default height applied to the divider component.
   * we recommend to use `px` units.
   *
   * @default 1px
   */
  dividerWeight?: string
  /**
   * The border width applied across the components.
   * @default
   * {
   *    small: "1px",
   *    medium: "2px",
   *    large: "3px",
   * }
   *
   */
  borderWidth?: BaseThemeUnit
  spacing?: Record<string, string>
}

export type ConfigTheme = {
  extend?: 'light' | 'dark'
  layout?: LayoutTheme
  colors?: Partial<ThemeColors>
}

export type ConfigThemes = Record<string, ConfigTheme>

/**
 * The HeroUI config.
 * @see https://www.heroui.com/docs/customization/customize-theme
 */
export type HeroUIPluginConfig = {
  /**
   * The prefix for the css variables.
   * @default "heroui"
   */
  prefix?: string
  /**
   * If true, the common heroui colors (e.g. "blue", "green", "purple") will not be extended on the theme.
   * @default false
   */
  addCommonColors?: boolean
  /**
   * Common layout definitions. These definitions are applied to all themes.
   */
  layout?: LayoutTheme
  /**
   * The theme definitions.
   */
  themes?: ConfigThemes
  /**
   * The default theme to use.
   * @default "light"
   */
  defaultTheme?: DefaultThemeType
  /**
   * The default theme to extend.
   * @default "light"
   */
  defaultExtendTheme?: DefaultThemeType
}
