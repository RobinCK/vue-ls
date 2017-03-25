var base = require('./karma.config.js');

module.exports = function (config) {
  config.set(Object.assign(base, {
    singleRun: true,
    browsers: ['Chrome'],
    reporters: ['progress'],
    plugins:  base.plugins.concat([
      'karma-chrome-launcher'
    ])
  }))
};
