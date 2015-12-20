'use strict';

var gulp   = require('gulp'),
    config = require('../config');

gulp.task('base', function() {
  var src  = config.base.src,
      dest = config.base.dest;

  // copy manifest to dist
  return gulp.src(src + '*')
    .pipe(gulp.dest(dest));
});
