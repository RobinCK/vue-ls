var gulp = require('gulp');
var babel = require('rollup-plugin-babel');
var rename = require('gulp-rename');
var rollup = require('gulp-rollup');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
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

gulp.task('js', function () {
  return gulp.src('./src/index.js')
    .pipe(rollup({
      allowRealFiles: true,
      input: './src/index.js',
      format: 'umd',
      name: 'vue-ls',
      plugins: [
        babel({
          babelrc: false,
          runtimeHelpers: true,
          externalHelpers: false,
          exclude: 'node_modules/**',
          presets: [['es2015', {'modules': false}]],
          plugins: [
            'transform-object-assign',
            'external-helpers'
          ]
        })
      ]
    }))
    .pipe(rename('vue-ls.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename('vue-ls.min.js'))
    .pipe(sourcemaps.write('.', {includeContent: false}))
    .pipe(gulp.dest('./dist'))
  ;
});

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
