'use strict';

var gulp    = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    config  = require('../config');

gulp.task('styles', function() {
  var src  = config.styles.src,
      dest = config.styles.dest;

  return gulp.src(src)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass())
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(dest));
});
