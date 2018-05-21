/* config-overrides.js */

const rewireCSS = require('./rewire/react-app-rewire-css-scss');

module.exports = function override(config, env) {
  config = rewireCSS(config, env);
  return config;
};
