'use strict';

var gulp    = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    config  = require('../config');

gulp.task('lint', ['jshint', 'jscs']);

var src = config.lint.src;

gulp.task('jshint', function() {
  return gulp.src(src)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('jscs', function() {
  return gulp.src(src)
    .pipe(plugins.jscs())
    .on('error', plugins.util.noop)
    .pipe(plugins.jscsStylish());
});
