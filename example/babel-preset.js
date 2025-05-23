const bobPresetFactory = require('react-native-builder-bob/babel-preset')

module.exports = function (api, options, cwd) {
  const bobPreset = bobPresetFactory(api, options, cwd)

  return {
    ...bobPreset,
    presets: bobPreset.presets.filter(
      (preset) =>
        !(
          Array.isArray(preset) &&
          typeof preset[0] === 'string' &&
          preset[0].includes('preset-react')
        )
    ),
  }
}
