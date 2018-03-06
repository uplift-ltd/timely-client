module.exports = {
  use: [
    '@neutrinojs/standardjs',
    [
      '@neutrinojs/eslint',
      {
        eslint: {
          extends: ['prettier'],
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
