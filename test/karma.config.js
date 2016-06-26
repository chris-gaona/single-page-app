'use strict';

module.exports = function (config) {
  config.set({
    basePath: '../',

    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-route/angular-route.js',
      'node_modules/angular-animate/angular-animate.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'public/scripts/route-config.js',
      'public/scripts/recipesController.js',
      'public/scripts/dataService.js',
      'test/unit/controllersSpec.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['PhantomJS'],

    plugin: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'jasmine-core',
      'karma-phantomjs-launcher'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
  });
};
