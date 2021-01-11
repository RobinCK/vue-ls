const gulp = require('gulp');
const http = require('http');
const connect = require('connect');
const serveStatic = require('serve-static');
const nightwatch = require('gulp-nightwatch');
const gutil = require('gulp-util');
const args = require('get-gulp-args')();

let httpServer;

function logger (message) {
  gutil.log(gutil.colors.green(message));
}

gulp.task('http:start', (done) => {
  logger('Start http server');

  const app = connect().use(serveStatic('./'));
  httpServer = http.createServer(app).listen(9000, done);
});

gulp.task('http:stop', (done) => {
  httpServer.close();
  logger('Shutdown http server');
  done();
});

gulp.task('e2e', gulp.series(['http:start'], () => {
  const env = args.env;

  return gulp.src('./build/nightwatch.config.js')
    .pipe(nightwatch({
      configFile: './build/nightwatch.config.js',
      cliArgs: ['--env ' + env]
    }));
}));

gulp.task('test', gulp.series(['e2e', 'http:stop']));
