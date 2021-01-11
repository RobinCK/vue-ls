const base = require('./karma.config.js');
const batches = {
  sl_edge_13: {
    base: 'SauceLabs',
    browserName: 'MicrosoftEdge',
    platform: 'Windows 10',
    version: '13'
  },
  sl_chrome: {
    base: 'SauceLabs',
    browserName: 'chrome',
    platform: 'Windows 10'
  },
  sl_firefox: {
    base: 'SauceLabs',
    browserName: 'firefox'
  },
  sl_mac_safari: {
    base: 'SauceLabs',
    browserName: 'safari',
    platform: 'OS X 10.15'
  }
};

module.exports = function(config) {
  config.set(Object.assign(base, {
    singleRun: true,
    browsers: Object.keys(batches),
    customLaunchers: batches,
    reporters: process.env.CI ? ['dots', 'saucelabs'] : ['progress', 'saucelabs'],
    sauceLabs: {
      testName: 'vue-ls',
      username: process.env.SAUCE_USERNAME,
      accessKey: process.env.SAUCE_ACCESS_KEY,
      recordScreenshots: false,
      sauceLabs: {
        testName: 'Vue.js unit tests',
        recordScreenshots: false,
        connectOptions: {
          'no-ssl-bump-domains': 'all' // Ignore SSL error on Android emulator
        },
        build: process.env.CIRCLE_BUILD_NUM || process.env.SAUCE_BUILD_ID || Date.now()
      },
      public: 'public',
      build: process.env.BUILD_NUMBER || process.env.BUILD_TAG || process.env.CI_BUILD_NUMBER ||
      process.env.CI_BUILD_TAG || process.env.TRAVIS_BUILD_NUMBER || process.env.CIRCLE_BUILD_NUM ||
      process.env.DRONE_BUILD_NUMBER|| Date.now()
    },
    plugins: base.plugins.concat([
      'karma-sauce-launcher'
    ])
  }))
};
