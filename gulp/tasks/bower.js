var gulp    = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    config  = require('../config');

gulp.task('bower', function() {
  return plugins.bower({
    directory: config.bower.dest,
    cwd: process.cwd()
  });
});
