const mainConfig = require('../../babel.config');

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
  env: mainConfig.env,
};
