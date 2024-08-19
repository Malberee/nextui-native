import Color from 'color'
import deepMerge from 'deepmerge'
import forEach from 'lodash.foreach'
import get from 'lodash.get'
import kebabCase from 'lodash.kebabcase'
import mapKeys from 'lodash.mapkeys'
import omit from 'lodash.omit'
import plugin from 'tailwindcss/plugin'

import { animations } from './animations'
import { commonColors, semanticColors } from './colors'
import { darkLayout, defaultLayout, lightLayout } from './default-layout'
import type {
  ConfigTheme,
  ConfigThemes,
  DefaultThemeType,
  NextUIPluginConfig,
} from './types'
import { baseStyles } from './utils/classes'
import { flattenThemeObject } from './utils/object'
import { isBaseTheme } from './utils/theme'

const DEFAULT_PREFIX = 'nextui'

const parsedColorsCache: Record<string, number[]> = {}

// @internal
const resolveConfig = (
  themes: ConfigThemes = {},
  defaultTheme: DefaultThemeType,
  prefix: string
) => {
  const resolved: {
    variants: { name: string; definition: string[] }[]
    utilities: Record<string, Record<string, any>>
    colors: Record<
      string,
      ({
        opacityValue,
        opacityVariable,
      }: {
        opacityValue: string
        opacityVariable: string
      }) => string
    >
  } = {
    variants: [],
    utilities: {},
    colors: {},
  }

  for (const [themeName, { extend, layout, colors }] of Object.entries(
    themes
  )) {
    let cssSelector = `.${themeName},[data-theme="${themeName}"]`
    const scheme =
      themeName === 'light' || themeName === 'dark' ? themeName : extend

    // if the theme is the default theme, add the selector to the root element
    if (themeName === defaultTheme) {
      cssSelector = `:root,${cssSelector}`
    }

    resolved.utilities[cssSelector] = scheme
      ? {
          'color-scheme': scheme,
        }
      : {}

    // flatten color definitions
    const flatColors = flattenThemeObject(colors) as Record<string, string>

    const flatLayout = layout ? mapKeys(layout, (_, key) => kebabCase(key)) : {}

    // resolved.variants
    resolved.variants.push({
      name: themeName,
      definition: [`&.${themeName}`, `&[data-theme='${themeName}']`],
    })

    /**
     * Colors
     */
    for (const [colorName, colorValue] of Object.entries(flatColors)) {
      if (!colorValue) return

      try {
        const parsedColor =
          parsedColorsCache[colorValue] ||
          Color(colorValue).hsl().round(2).array()

        parsedColorsCache[colorValue] = parsedColor

        const [h, s, l, defaultAlphaValue] = parsedColor
        const nextuiColorVariable = `--${prefix}-${colorName}`
        const nextuiOpacityVariable = `--${prefix}-${colorName}-opacity`

        // set the css variable in "@layer utilities"
        resolved.utilities[cssSelector]![nextuiColorVariable] =
          `${h} ${s}% ${l}%`
        // if an alpha value was provided in the color definition, store it in a css variable
        if (typeof defaultAlphaValue === 'number') {
          resolved.utilities[cssSelector]![nextuiOpacityVariable] =
            defaultAlphaValue.toFixed(2)
        }
        // set the dynamic color in tailwind config theme.colors
        resolved.colors[colorName] = ({ opacityVariable, opacityValue }) => {
          // if the opacity is set  with a slash (e.g. bg-primary/90), use the provided value
          if (!isNaN(+opacityValue)) {
            return `hsl(var(${nextuiColorVariable}) / ${opacityValue})`
          }
          // if no opacityValue was provided (=it is not parsable to a number)
          // the nextuiOpacityVariable (opacity defined in the color definition rgb(0, 0, 0, 0.5)) should have the priority
          // over the tw class based opacity(e.g. "bg-opacity-90")
          // This is how tailwind behaves as for v3.2.4
          if (opacityVariable) {
            return `hsl(var(${nextuiColorVariable}) / var(${nextuiOpacityVariable}, var(${opacityVariable})))`
          }

          return `hsl(var(${nextuiColorVariable}) / var(${nextuiOpacityVariable}, 1))`
        }
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.log('error', error?.message)
      }
    }

    /**
     * Layout
     */
    for (const [key, value] of Object.entries(flatLayout)) {
      if (!value) return

      const layoutVariablePrefix = `--${prefix}-${key}`

      if (typeof value === 'object') {
        for (const [nestedKey, nestedValue] of Object.entries(value)) {
          const nestedLayoutVariable = `${layoutVariablePrefix}-${nestedKey}`

          resolved.utilities[cssSelector]![nestedLayoutVariable] = nestedValue
        }
      } else {
        // Handle opacity values and other singular layout values
        const formattedValue =
          layoutVariablePrefix.includes('opacity') && typeof value === 'number'
            ? value.toString().replace(/^0\./, '.')
            : value

        resolved.utilities[cssSelector]![layoutVariablePrefix] = formattedValue
      }
    }
  }

  return resolved
}

const corePlugin = (
  themes: ConfigThemes = {},
  defaultTheme: DefaultThemeType,
  prefix: string,
  addCommonColors: boolean
) => {
  const resolved = resolveConfig(themes, defaultTheme, prefix)

  return plugin(
    ({ addBase, addUtilities, addVariant }) => {
      // add base classNames
      addBase({ [':root, [data-theme]']: { ...baseStyles(prefix) } })

      // add the css variables to "@layer utilities"
      addUtilities({ ...resolved?.utilities })
      // add the theme as variant e.g. "[theme-name]:text-2xl"
      resolved?.variants.forEach((variant) => {
        addVariant(variant.name, variant.definition)
      })
    },
    {
      theme: {
        extend: {
          // @ts-ignore
          colors: {
            ...(addCommonColors ? commonColors : {}),
            ...resolved?.colors,
          },
          height: {
            divider: `var(--${prefix}-divider-weight)`,
          },
          width: {
            divider: `var(--${prefix}-divider-weight)`,
          },
          fontSize: {
            tiny: [
              `var(--${prefix}-font-size-tiny)`,
              `var(--${prefix}-line-height-tiny)`,
            ],
            small: [
              `var(--${prefix}-font-size-small)`,
              `var(--${prefix}-line-height-small)`,
            ],
            medium: [
              `var(--${prefix}-font-size-medium)`,
              `var(--${prefix}-line-height-medium)`,
            ],
            large: [
              `var(--${prefix}-font-size-large)`,
              `var(--${prefix}-line-height-large)`,
            ],
          },
          borderRadius: {
            small: `var(--${prefix}-radius-small)`,
            medium: `var(--${prefix}-radius-medium)`,
            large: `var(--${prefix}-radius-large)`,
          },
          opacity: {
            hover: `var(--${prefix}-hover-opacity)`,
            disabled: `var(--${prefix}-disabled-opacity)`,
          },
          borderWidth: {
            small: `var(--${prefix}-border-width-small)`,
            medium: `var(--${prefix}-border-width-medium)`,
            large: `var(--${prefix}-border-width-large)`,
            1: '1px',
            1.5: '1.5px',
            3: '3px',
            5: '5px',
          },
          ...animations,
        },
      },
    }
  )
}

export const nextui = (
  config: NextUIPluginConfig = {}
): ReturnType<typeof plugin> => {
  const {
    themes: themeObject = {},
    defaultTheme = 'light',
    layout: userLayout,
    defaultExtendTheme = 'light',
    prefix: defaultPrefix = DEFAULT_PREFIX,
    addCommonColors = false,
  } = config

  const userLightColors = get(themeObject, 'light.colors', {})
  const userDarkColors = get(themeObject, 'dark.colors', {})

  const defaultLayoutObj =
    userLayout && typeof userLayout === 'object'
      ? deepMerge(defaultLayout, userLayout)
      : defaultLayout

  const baseLayouts = {
    light: {
      ...defaultLayoutObj,
      ...lightLayout,
    },
    dark: {
      ...defaultLayoutObj,
      ...darkLayout,
    },
  }

  // get other themes from the config different from light and dark
  let otherThemes = omit(themeObject, ['light', 'dark']) || {}

  forEach(otherThemes, ({ extend, colors, layout }, themeName) => {
    const baseTheme =
      extend && isBaseTheme(extend) ? extend : defaultExtendTheme

    if (colors && typeof colors === 'object') {
      // @ts-ignore
      otherThemes[themeName].colors = deepMerge(
        semanticColors[baseTheme],
        colors
      )
    }
    if (layout && typeof layout === 'object') {
      // @ts-ignore
      otherThemes[themeName].layout = deepMerge(
        extend ? baseLayouts[extend] : defaultLayoutObj,
        layout
      )
    }
  })

  const light: ConfigTheme = {
    layout: deepMerge(baseLayouts.light, get(themeObject, 'light.layout', {})),
    colors: deepMerge(semanticColors.light, userLightColors),
  }

  const dark = {
    layout: deepMerge(baseLayouts.dark, get(themeObject, 'dark.layout', {})),
    colors: deepMerge(semanticColors.dark, userDarkColors),
  }

  const themes = {
    light,
    dark,
    ...otherThemes,
  }

  return corePlugin(themes, defaultTheme, defaultPrefix, addCommonColors)
}
