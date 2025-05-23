const {
  getConfig: originalGetConfig,
} = require('react-native-builder-bob/babel-config')

const getConfig = (defaultConfig, { root }) => {
  const config = originalGetConfig(defaultConfig, { root })

  config.overrides = config.overrides?.map((override) => {
    if (!override.presets) return override

    return {
      ...override,
      presets: override.presets.map((preset) => {
        if (
          Array.isArray(preset) &&
          typeof preset[0] === 'string' &&
          preset[0].includes('babel-preset')
        ) {
          return [require.resolve('./babel-preset'), ...preset.slice(1)]
        }

        return preset
      }),
    }
  })

  return config
}

exports.getConfig = getConfig
