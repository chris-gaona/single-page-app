'use strict';

module.exports = function (config) {
  config.set({
    basePath: '../',

    files: [
      'public/scripts/**/*.js',
      'test/unit/**/*.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugin: [
      'karma-chrome-launcher',
      'karma-jasmine'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
  });
};
