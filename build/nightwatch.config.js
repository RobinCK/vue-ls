const seleniumServer = require('selenium-server');

module.exports = {
  'src_folders': [
    'test/e2e'
  ],
  'output_folder': 'reports',
  'test_workers': false,

  'selenium' : {
    'start_process' : true,
    'server_path' : seleniumServer.path,
    'port' : 4444,
    'cli_args' : {
      'webdriver.chrome.driver' : './node_modules/.bin/chromedriver',
    }
  },

  'test_settings': {
    'default': {
      'selenium_port': 4444,
      'selenium_host': '127.0.0.1',
      'silent': true,
      'desiredCapabilities': {
        'build': 'nightwatch',
        'project': 'vue-ls'
      }
    },
    'chrome': {
      'desiredCapabilities': {
        'browserName': 'chrome',
        'resolution': '1024x768'
      }
    },
  }
};
