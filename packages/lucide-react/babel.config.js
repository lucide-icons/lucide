const mainConfig = require('../../babel.config');

module.exports = {
  presets: ['@babel/env'],
  env: {
    test: {
      ...mainConfig.env.test,
      presets: ['@babel/env, react-app'],
    },
    ...mainConfig.env,
  },
};
