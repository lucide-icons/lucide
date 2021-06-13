module.exports = {
  presets: ['@babel/env'],
  // babelrcRoots: ['.', './packages/*'],
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
