const mainConfig = require('../../babel.config');

module.exports = {
  presets: [...mainConfig.presets, 'react-app'],
  env: mainConfig.env,
};
