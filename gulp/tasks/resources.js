'use strict';

var gulp   = require('gulp'),
    config = require('../config');

gulp.task('resources', function() {
  var src  = config.resources.src,
      dest = config.resources.dest;

  // copy manifest to dist
  return gulp.src(src + '**/*')
    .pipe(gulp.dest(dest));
});
