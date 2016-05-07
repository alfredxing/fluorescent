'use strict';

var gulp   = require('gulp'),
    Server = require('karma').Server;

gulp.task('test', function(done) {
  new Server({
    configFile: process.cwd() + '/karma.conf.js',
    singleRun: true
  }, done).start();
});
