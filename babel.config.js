module.exports = {
  overrides: [
    {
      exclude: /\/node_modules\//,
      presets: [
        [
          'module:react-native-builder-bob/babel-preset',
          { jsxImportSource: 'nativewind', modules: 'commonjs' },
        ],
        'nativewind/babel',
      ],
    },
    {
      include: /\/node_modules\//,
      presets: ['module:@react-native/babel-preset'],
    },
  ],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
        alias: {
          '@': './src',
        },
      },
    ],
  ],
}
