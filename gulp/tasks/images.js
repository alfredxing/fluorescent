'use strict';

var gulp    = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    merge   = require('merge-stream'),
    _       = require('lodash'),
    config  = require('../config');

gulp.task('images', ['copy-images', 'generate-icons']);

gulp.task('copy-images', function() {
  var src  = config.images.src,
      dest = config.images.dest;

  return gulp.src(src + '*')
    .pipe(gulp.dest(dest));
});

gulp.task('generate-icons', function() {
  var iconSrc   = config.images.iconSrc,
      iconSizes = config.images.iconSizes,
      dest      = config.images.dest;

  // generate png icons from logo for chrome extension
  return _.chain(iconSizes)
    .map(function(size) {
      return gulp.src(iconSrc)
        .pipe(plugins.svg2png(size / 100))
        .pipe(plugins.rename({
          basename: "icon-",
          suffix: size.toString()
        }))
        .pipe(gulp.dest(dest));
    })
    .reduce(function(a,b) {
      return merge(a,b);
    })
    .value();
});