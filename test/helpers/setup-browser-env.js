var MockBrowser = require('mock-browser').mocks.MockBrowser;

global.window = MockBrowser.createWindow();
global.document = MockBrowser.createDocument();
