const { ConfigPlugin, createRunOncePlugin } = require('@expo/config-plugins');

const { withAppMetricaAndroid } = require('./withAppMetricaAndroid');
const { withAppMetricaIOS } = require('./withAppMetricaIOS');

const pkg = require('react-native-appmetrica-next/package.json');

const withAppMetrica = (config) => {
  config = withAppMetricaAndroid(config);
  config = withAppMetricaIOS(config);
  return config;
};

exports.default = createRunOncePlugin(withAppMetrica, pkg.name, pkg.version);
