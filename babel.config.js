module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@config': './src/config',
          '@models': './src/models',
          '@controllers': './src/controllers',
          '@middleware': './src/middeware',
          '@database': './src/database',
          '@repository': './src/repository',
          '@routes': './src/routes',
          '@services': './src/services',
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts'],
};
