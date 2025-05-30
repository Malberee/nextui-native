module.exports = {
  tabWidth: 2,
  endOfLine: 'auto',
  useTabs: false,
  semi: false,
  singleQuote: true,
  quoteProps: 'consistent',
  trailingComma: 'es5',
  importOrder: ['^@core/(.*)$', '^@server/(.*)$', '^@ui/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  tailwindFunctions: ['tv'],
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
}
