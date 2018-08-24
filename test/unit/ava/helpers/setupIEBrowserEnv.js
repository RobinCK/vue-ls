const MockBrowser = require('mock-browser').mocks.MockBrowser;

global.document = MockBrowser.createDocument();
global.window = MockBrowser.createWindow();
global.window.addEventListener = null;
global.window.attachEvent = function(name, callback) {
  callback.call();
};
