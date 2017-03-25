module.exports = {
  frameworks: ['jasmine'],
  basePath: '../',
  files: [
    'test/unit/jasmine/*.js'
  ],
  preprocessors: {
    'src/**/*.js': ['webpack'],
    'test/**/*.js': ['webpack']
  },
  webpack: require('./webpack.config.js'),
  webpackMiddleware: {
    noInfo: true
  },
  plugins: [
    'karma-webpack',
    'karma-chrome-launcher',
    'karma-jasmine'
  ]
};
