'use strict';

var gulp       = require('gulp'),
    plugins    = require('gulp-load-plugins')(),
    browserify = require('browserify'),
    server     = require('karma').server,
    source     = require('vinyl-source-stream'),
    merge      = require('merge-stream'),
    _          = require('lodash');

var paths = {
  base:    ['src/app/chrome-extension/manifest.json'],
  scripts: ['src/app/**/*.js'],
  styles:  ['src/app/chrome-extension/styles/**/*.scss'],
  images:  ['src/app/chrome-extension/images/**']
};

gulp.task('default', ['chrome:base', 'chrome:scripts', 'chrome:styles', 'chrome:images']);

gulp.task('watch', function() {
  gulp.watch(paths.base,    ['chrome:base']);
  gulp.watch(paths.scripts, ['chrome:scripts']);
  gulp.watch(paths.styles,  ['chrome:styles']);
  gulp.watch(paths.images,  ['chrome:images']);
});

gulp.task('lint', ['jshint', 'jscs']);

gulp.task('jshint', function() {
  return gulp.src('src/app/**/*.js')
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('jscs', function() {
  return gulp.src('src/app/**/*.js')
    .pipe(plugins.jscs())
    .on('error', plugins.util.noop)
    .pipe(plugins.jscsStylish());
});

gulp.task('test', function(done) {
  server.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
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

gulp.task('chrome:scripts', ['lint', 'test'], function() {
  var sourcePath = 'src/app/chrome-extension/scripts/';
  var bundleNames = ['background', 'content', 'options', 'popup'];

  return _.chain(bundleNames)
    .map(function(bundleName) {
      return browserify(sourcePath + bundleName + '/index.js')
        .bundle()
        .pipe(source(bundleName + '.js'))
        .pipe(gulp.dest('dist/chrome-dev/scripts'))
    })
    .reduce(function(a,b) {
      return merge(a,b);
    })
    .value();
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
