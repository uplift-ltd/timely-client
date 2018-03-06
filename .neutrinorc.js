module.exports = {
  use: [
    '@neutrinojs/airbnb-base',
    [
      '@neutrinojs/library',
      {
        name: 'timely-client',
        target: 'node',
        libraryTarget: 'commonjs2'
      }
    ],
    '@neutrinojs/jest'
  ]
};
