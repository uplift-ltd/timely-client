module.exports = {
  use: [
    '@neutrinojs/standardjs',
    [
      '@neutrinojs/eslint',
      {
        eslint: {
          extends: ['plugin:prettier/recommended'],
        },
      },
    ],
    [
      '@neutrinojs/library',
      {
        name: 'timely-client',
        target: 'node',
        libraryTarget: 'commonjs2',
      },
    ],
    '@neutrinojs/jest',
  ],
}
