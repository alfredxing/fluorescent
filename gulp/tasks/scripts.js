'use strict';

var gulp       = require('gulp'),
    plugins    = require('gulp-load-plugins')(),
    buffer     = require('vinyl-buffer'),
    source     = require('vinyl-source-stream'),
    merge      = require('merge-stream'),
    assign     = require('object.assign'),
    browserify = require('browserify'),
    watchify   = require('watchify'),
    babelify   = require('babelify'),
    config     = require('../config');

gulp.task('scripts', ['lint', 'test'], function() { return compileAll(); });
gulp.task('scripts-watch', function() { return compileAll(true); });

function compileAll(watch, prod) {
  var conf         = config.scripts,
      src          = conf.src,
      dest         = (prod) ? conf.prod.dest : conf.dest,
      bundleNames  = conf.bundles,
      entry        = conf.entry;

  return bundleNames
    .map(function(bundleName) {
      return compile(src, dest, bundleName, entry, watch, prod);
    })
    .reduce(function(a,b) {
      return merge(a,b);
    });
}

function compile(src, dest, bundleName, entry, watch, prod) {
  var customOpts = {
    entries: [ src + bundleName + '/' + entry],
    debug: true
  };

  var opts    = assign({}, watchify.args, customOpts),
      bundler = browserify(opts);

  if (watch) {
    bundler = watchify(bundler);
    bundler.on('update', rebundle);
    bundler.on('log', plugins.util.log);
  }

  bundler.transform(babelify);

  function rebundle() {
    var bundleStream = bundler.bundle()
      .on('error', function(err) {
        console.error(err);
        this.emit('end');
      })
      .pipe(source(bundleName + '.js'))
      .pipe(buffer());

    if (prod) {
      bundleStream.pipe(plugins.uglify())
        .pipe(plugins.rename({suffix: '.min', extname: '.js'}))
    }

    return bundleStream.pipe(gulp.dest(dest));
  }

  return rebundle();
}
