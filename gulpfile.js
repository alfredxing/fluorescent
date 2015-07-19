'use strict';

var gulp    = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    server  = require('karma').server,
    merge   = require('merge-stream'),
    _       = require('lodash');

gulp.task('jshint', function() {
  return gulp.src('src/app/**/*.js')
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('chrome:base', function() {
  // copy manifest to dist
  return gulp.src('src/app/chrome-extension/manifest.json')
    .pipe(gulp.dest('dist/chrome-dev'));
});

gulp.task('chrome:styles', function() {
  return gulp.src('src/app/chrome-extension/styles/*.scss')
    .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass())
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest('dist/chrome-dev/styles'));
});

gulp.task('chrome:scripts', function() {

});

gulp.task('chrome:images', function () {
  // generate png icons from logo for chrome extension
  var iconSizes = [19,38,16,32,48,64,96,128,256];

  var iconStream = _.chain(iconSizes)
    .map(function(size) {
      return gulp.src('src/app/chrome-extension/images/logo.svg')
        .pipe(plugins.svg2png(size / 100))
        .pipe(plugins.rename({
          basename: "icon-",
          suffix: size.toString()
        }))
        .pipe(gulp.dest('dist/chrome-dev/images'));
    })
    .reduce(function(a,b) {
      return merge(a,b);
    })
    .value();

  // copy src images directly to dist
  var copyStream = gulp.src('src/app/chrome-extension/images/*')
    .pipe(gulp.dest('dist/chrome-dev/images'));

  return merge(iconStream, copyStream);
});

gulp.task('test', function(done) {
  server.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});
