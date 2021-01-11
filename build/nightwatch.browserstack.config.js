const nightwatch_config = {
  src_folders : [ "test/e2e" ],

  selenium : {
    "start_process" : false,
    "host" : "hub-cloud.browserstack.com",
    "port" : 80
  },

  test_settings: {
    default: {
      desiredCapabilities: {
        'build': 'nightwatch-browserstack',
        'browserstack.user': process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
        'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
        'browserstack.debug': true,
        'browserstack.local': true,
        'browser': 'chrome'
      }
    },
    bstack_edge: {
      'desiredCapabilities': {
        'browserName': 'MicrosoftEdge',
        'os': 'Windows',
        'os_version': '10',
        'browser': 'Edge',
        'resolution': '1024x768'
      }
    },
    bstack_chrome: {
      desiredCapabilities: {
        'browserName': 'Chrome',
        'os': 'Windows',
        'os_version': '10',
        'browser': 'Chrome',
        'resolution': '1024x768'
      }
    },
    bstack_firefox: {
      desiredCapabilities: {
        'browserName': 'Firefox',
        'os': 'Windows',
        'os_version': '7',
        'browser': 'Firefox',
        'resolution': '1024x768'
      }
    },
    bstack_firefox_osx: {
      desiredCapabilities: {
        'browserName': 'Firefox',
        'os': 'OS X',
        'os_version': 'El Capitan',
        'browser': 'Firefox',
        'resolution': '1024x768'
      }
    },
    bstack_safari: {
      desiredCapabilities: {
        'browserName': 'Safari',
        'os': 'OS X',
        'os_version': 'Sierra',
        'browser': 'Safari',
        'resolution': '1024x768'
      }
    }
  }
};

// Code to copy seleniumhost/port into test settings
for (let i in nightwatch_config.test_settings) {
  const config = nightwatch_config.test_settings[i];

  config['selenium_host'] = nightwatch_config.selenium.host;
  config['selenium_port'] = nightwatch_config.selenium.port;
}

module.exports = nightwatch_config;
