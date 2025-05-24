module.exports = {
  source: 'src',
  output: 'lib',
  targets: [
    [
      'module',
      {
        esm: true,
        configFile: true,
      },
    ],
    [
      'typescript',
      {
        project: 'tsconfig.build.json',
      },
    ],
  ],
}
