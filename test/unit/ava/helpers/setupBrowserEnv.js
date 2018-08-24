const MockBrowser = require('mock-browser').mocks.MockBrowser;

global.document = MockBrowser.createDocument();
global.window = MockBrowser.createWindow();
