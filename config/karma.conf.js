// Karma configuration
// Generated on Sat Dec 21 2013 09:03:41 GMT-0500 (EST)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '../',


    // frameworks to use
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
			"public/javascripts/vendor/jquery/dist/jquery.js",
			"public/javascripts/vendor/jquery-ui/ui/jquery-ui.js",
			"public/javascripts/vendor/angular/angular.js",
			"public/javascripts/vendor/angular-touch/angular-touch.js",
			"public/javascripts/vendor/angular-route/angular-route.js",
			"public/javascripts/vendor/angular-animate/angular-animate.js",
			"public/javascripts/vendor/angular-bootstrap/ui-bootstrap-tpls.js",
			"public/javascripts/vendor/angular-ui-sortable/sortable.js",
			"public/javascripts/vendor/pickadate/lib/picker.js",
			"public/javascripts/vendor/pickadate/lib/picker.date.js",
			"public/javascripts/vendor/jsondiffpatch/build/bundle.js",
			"public/javascripts/vendor/fastclick/lib/fastclick.js",
			"public/javascripts/TodoModule.js",
			"public/javascripts/directives/*.js",
			"public/javascripts/services/*.js",
			"public/javascripts/controllers/*.js",
			"public/javascripts/vendor/bootstrap/dist/js/bootstrap.js",
      'public/tests/lib/angular-mocks.js',
      'public/tests/unit/**/*.js',
    ],


    // list of files to exclude
    exclude: [
      '**/*.swp'
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['Firefox'],



    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
