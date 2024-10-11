module.exports = {
  presets: [
    [
      'module:react-native-builder-bob/babel-preset',
      { jsxImportSource: 'nativewind', modules: 'commonjs' },
    ],
    'nativewind/babel',
  ],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
          '@': './src',
        },
      },
    ],
  ],
}
