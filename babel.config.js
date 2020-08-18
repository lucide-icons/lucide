module.exports = {
  presets: [
    [
      '@babel/env',
      {
        loose: true,
        modules: false,
      },
    ],
  ],
  // plugins: ['babel-plugin-add-import-extension'],
  env: {
    test: {
      presets: ['@babel/env'],
      plugins: ['@babel/plugin-transform-runtime'],
    },
    dev: {
      plugins: [
        [
          'transform-inline-environment-variables',
          {
            include: ['NODE_ENV'],
          },
        ],
      ],
    },
  },
};
