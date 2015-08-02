'use strict';

var gulp   = require('gulp'),
    server = require('karma').server;

gulp.task('test', function(done) {
  server.start({
    configFile: process.cwd() + '/karma.conf.js',
    singleRun: true
  }, done);
});
