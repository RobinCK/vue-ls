#!/usr/bin/env node

const Nightwatch = require('nightwatch');
const browserstack = require('browserstack-local');
const serveStatic = require('serve-static');
const connect = require('connect');
const http = require('http');
const path = require('path');
let bs_local;
let httpServer;

// eslint-disable-next-line
const logger = console.log;

try {
  logger("Start server");

  const app = connect().use(serveStatic(path.resolve('./')));
  httpServer = http.createServer(app).listen(9000, () => {
    process.mainModule.filename = "./node_modules/nightwatch/bin/nightwatch"
    // Code to start browserstack local before start of test

    logger("Connecting local");
    Nightwatch.bs_local = bs_local = new browserstack.Local();

    bs_local.start({'key': process.env.BROWSERSTACK_ACCESS_KEY }, (error) => {
      if (error) {
        throw error;
      }

      logger('Connected. Now testing...');

      Nightwatch.cli((argv) => {
        Nightwatch.CliRunner(argv)
          .setup(null, () => {
            // Code to stop browserstack local after end of parallel test
            bs_local.stop(() => {});
          })
          .runTests(() => {
            // Code to stop browserstack local after end of single test
            bs_local.stop(() => {
              logger("Stop Server");
              httpServer.close();
            });
          });
      });
    });
  });
} catch (ex) {
  logger('There was an error while starting the test runner:\n\n');
  process.stderr.write(ex.stack + '\n');
  process.exit(2);
}
