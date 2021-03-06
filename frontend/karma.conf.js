// Karma configuration
// Generated on Mon Dec 30 2019 17:24:53 GMT+0800 (GMT+08:00)


const { deployRoot, RootDir } = require('./filePath.js');
const baseWebpackConfig = require(deployRoot + '/build/webpack.test');

console.log(deployRoot + '/build/webpack.test', RootDir + '/test/unit/**/*.spec.js');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      RootDir + '/test/unit/**/*.spec.js'
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        [RootDir + '/test/unit/**/*.spec.js']: ['webpack']
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
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
    webpack: baseWebpackConfig,
    proxies: {
      //"/metamodel": "http://192.168.1.128:8080",
      //"/enum": "http://192.168.1.128:8080"
      "/metamodel": "http://192.168.21.41:8080",
      "/enum": "http://192.168.21.41:8080"
    }
  })
}
