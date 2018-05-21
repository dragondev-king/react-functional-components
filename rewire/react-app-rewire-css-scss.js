const { getLoader } = require('react-app-rewired');

const cssLoaderMatcher = function (rule) {
  return rule.loader && rule.loader.indexOf('css-loader') !== -1;
};

function rewireCSS(config, env) {
  const cssRules = getLoader(config.module.rules, rule => rule.test && String(rule.test) === String(/\.css$/));
  cssRules.test = /\.s?css$/;
  const cssLoader = getLoader(config.module.rules, cssLoaderMatcher);
  cssLoader.options = {
    modules: true,
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]',
  };
  return config;
}
module.exports = rewireCSS;
