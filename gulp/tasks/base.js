'use strict';

var gulp   = require('gulp'),
    config = require('../config');

gulp.task('base', function() {
  var manifestSrc = config.base.manifestSrc,
      dest        = config.base.dest;

  // copy manifest to dist
  return gulp.src(manifestSrc)
    .pipe(gulp.dest(dest));
});
