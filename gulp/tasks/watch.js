'use strict';

var gulp   = require('gulp'),
    config = require('../config');

var paths = config.watch;

gulp.task('watch', ['base', 'styles', 'images', 'scripts-watch'], function() {
  gulp.watch(paths.base,    ['base']);
  gulp.watch(paths.scripts, ['lint', 'test']);
  gulp.watch(paths.styles,  ['styles']);
  gulp.watch(paths.images,  ['images']);
});
