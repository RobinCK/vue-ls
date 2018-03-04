var gulp = require('gulp');
var http = require('http');
var connect = require('connect');
var serveStatic = require('serve-static');
var nightwatch = require('gulp-nightwatch');
var gutil = require('gulp-util');
var args = require('get-gulp-args')();
var httpServer;

function logger (message) {
  gutil.log(gutil.colors.green(message));
}

gulp.task('http:start', function (done) {
  logger('Start http server');
  const app = connect().use(serveStatic('./'));
  httpServer = http.createServer(app).listen(9000, done);
});

gulp.task('http:stop', function (done) {
  httpServer.close();
  logger('Shutdown http server');
  done();
});

gulp.task('e2e', gulp.series(['http:start'], function () {
  var env = args.env || 'phantomjs';

  return gulp.src('./build/nightwatch.config.js')
    .pipe(nightwatch({
      configFile: './build/nightwatch.config.js',
      cliArgs: ['--env ' + env]
    }));
}));

gulp.task('test', gulp.series(['e2e', 'http:stop']));
gulp.task('default', gulp.parallel('js'));
