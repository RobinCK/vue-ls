const base = require('./karma.config.js');

const batches = [
  {
    sl_ie_9: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 7',
      version: '9'
    },
    sl_ie_10: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8',
      version: '10'
    }
  },
  {
    sl_ie_11: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8.1',
      version: '11'
    },
    sl_edge_13: {
      base: 'SauceLabs',
      browserName: 'MicrosoftEdge',
      platform: 'Windows 10',
      version: '13'
    }
  },
  {
    sl_edge_14: {
      base: 'SauceLabs',
      browserName: 'MicrosoftEdge',
      platform: 'Windows 10',
      version: '14'
    },
    sl_chrome: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Windows 7'
    }
  },
  {
    sl_firefox: {
      base: 'SauceLabs',
      browserName: 'firefox'
    },
    sl_mac_safari: {
      base: 'SauceLabs',
      browserName: 'safari',
      platform: 'OS X 10.10'
    }
  },
  {
    sl_ios_safari_8: {
      base: 'SauceLabs',
      browserName: 'iphone',
      version: '8.4'
    },
    sl_ios_safari_9: {
      base: 'SauceLabs',
      browserName: 'iphone',
      version: '9.3'
    }
  },
  {
    sl_android_4_4: {
      base: 'SauceLabs',
      browserName: 'android',
      version: '4.4'
    },
    sl_android_5_1: {
      base: 'SauceLabs',
      browserName: 'android',
      version: '5.1'
    }
  }
];

module.exports = function(config) {
  var batch = batches[process.argv[4] || 0];

  config.set(Object.assign(base, {
    singleRun: true,
    browsers: Object.keys(batch),
    customLaunchers: batch,
    reporters: process.env.CI ? ['dots', 'saucelabs'] : ['progress', 'saucelabs'],
    sauceLabs: {
      testName: 'vue-ls unit tests',
      username: process.env.SAUCE_USERNAME,
      accessKey: process.env.SAUCE_ACCESS_KEY,
      recordScreenshots: false,
      connectOptions: {
        port: 5757,
        logfile: 'sauce_connect.log'
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
