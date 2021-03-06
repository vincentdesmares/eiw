// Karma configuration
// Generated on Sat Apr 19 2014 14:25:42 GMT+0200 (Romance Daylight Time)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['qunit', 'jasmine'],


        // list of files / patterns to load in the browser
        files: [
            // dependencies
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
            'bower_components/jquery-address/src/jquery.address.js',
            // Sources
            // The build file is NOT used because it makes the errors
            // too difficult to locate
            'src/main.js',
            'src/logger.js',
            'src/router.js',
            'src/template/*.js',
            'src/widget/*.js',
            'src/page/*.js',
            'src/application/*.js',
            'src/prefab/*.js',
            // Tests files
            // - Tests applications
            'test/fixtures/application/*.js',
            // - Tests suites
            'test/*.js',
            // fixtures
            {pattern: 'test/**/**/*.html', watched: true, served: true, included: false},
            {pattern: 'test/**/*.json', watched: true, served: true, included: false},
            {pattern: 'test/**/*.xml', watched: true, served: true, included: false}
        ],


        // list of files to exclude
        exclude: [

        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {

        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome', 'IE'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
