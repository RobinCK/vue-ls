require('browserstack-automate').Nightwatch();
var seleniumServer = require('selenium-server');

module.exports = {
  "src_folders": [
    "test/e2e"
  ],
  "output_folder": "reports",
  "test_workers": false,

  "selenium" : {
    "start_process" : true,
    "server_path" : seleniumServer.path,
    "port" : 4444,
    "cli_args" : {
      "webdriver.chrome.driver" : "./node_modules/.bin/chromedriver",
    }
  },

  "test_settings": {
    "default": {
      "selenium_port": 4444,
      "selenium_host": "127.0.0.1",
      "silent": true,
      "desiredCapabilities": {
        "build": "nightwatch",
        'project': 'vue-ls'
      }
    },
    "chrome": {
      "desiredCapabilities": {
        "browserName": "chrome",
        "resolution": "1024x768"
      }
    },
    "bstack_chrome_50": {
      "desiredCapabilities": {
        "browserName": "Chrome 50",
        "os": "Windows",
        "os_version": "7",
        "browser": "Chrome",
        "browser_version": "50.0",
        "resolution": "1024x768"
      }
    },
    "bstack_chrome_57": {
      "desiredCapabilities": {
        "browserName": "Chrome 57",
        "os": "Windows",
        "os_version": "10",
        "browser": "Chrome",
        "browser_version": "57.0",
        "resolution": "1024x768"
      }
    },

    "bstack_ie_9": {
      "desiredCapabilities": {
        "browserName": "IE 9",
        "os": "Windows",
        "os_version": "7",
        "browser": "IE",
        "browser_version": "9.0",
        "resolution": "1024x768"
      }
    },
    "bstack_ie_11": {
      "desiredCapabilities": {
        "browserName": "IE 11",
        "os": "Windows",
        "os_version": "10",
        "browser": "IE",
        "browser_version": "11.0",
        "resolution": "1024x768"
      }
    },

    "bstack_edge_13": {
      "desiredCapabilities": {
        "browserName": "MicrosoftEdge 13",
        "os": "Windows",
        "os_version": "10",
        "browser": "Edge",
        "browser_version": "13.0",
        "resolution": "1024x768"
      }
    },
    "bstack_edge_14": {
      "desiredCapabilities": {
        "browserName": "MicrosoftEdge 14",
        "os": "Windows",
        "os_version": "10",
        "browser": "Edge",
        "browser_version": "14.0",
        "resolution": "1024x768"
      }
    },

    "bstack_firefox_40": {
      "desiredCapabilities": {
        "browserName": "Firefox 40",
        "os": "Windows",
        "os_version": "7",
        "browser": "Firefox",
        "browser_version": "40.0",
        "resolution": "1024x768"
      }
    },
    "bstack_firefox_52": {
      "desiredCapabilities": {
        "browserName": "Firefox 52",
        "os": "OS X",
        "os_version": "El Capitan",
        "browser": "Firefox",
        "browser_version": "52.0",
        "resolution": "1024x768"
      }
    },

    "bstack_safari_8": {
      "desiredCapabilities": {
        "browserName": "Safari 8",
        "os": "OS X",
        "os_version": "Yosemite",
        "browser": "Safari",
        "browser_version": "8.0",
        "resolution": "1024x768"
      }
    },
    "bstack_safari_10": {
      "desiredCapabilities": {
        "browserName": "Safari 10",
        "os": "OS X",
        "os_version": "Sierra",
        "browser": "Safari",
        "browser_version": "10.0",
        "resolution": "1024x768"
      }
    },

    "phantomjs": {
      "desiredCapabilities": {
        "browserName": "phantomjs",
        "javascriptEnabled": true,
        "cookiesEnabled": true,
        "acceptSslCerts": true,
        "resolution": "1024x768",
        "phantomjs.page.settings.userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36",
        "phantomjs.binary.path": "node_modules/phantomjs/bin/phantomjs",
        "phantomjs.cli.args": "--webdriver=5558 --webdriver-selenium-grid-hub=http://localhost:4444"
      }
    }
  }
};
