module.exports = {
  source: 'src',
  output: 'lib',
  targets: [
    [
      'commonjs',
      {
        esm: true,
        configFile: true,
      },
    ],
    [
      'module',
      {
        // esm: true,
        configFile: true,
      },
    ],
    [
      'typescript',
      {
        configFile: true,
        project: 'tsconfig.build.json',
      },
    ],
  ],
}
