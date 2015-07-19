'use strict';

var gulp    = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    merge   = require('merge-stream'),
    _       = require('lodash'),
    browserify = require('browserify');

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

    // array of input files
    var files = [
        './src/app/chrome-extension/scripts/background/index.js',
        './src/app/chrome-extension/scripts/content/index.js',
        './src/app/chrome-extension/scripts/options/index.js',
        './src/app/chrome-extension/scripts/popup/index.js'
    ];

    // map array of input files into stream function
    var tasks = files.map(function(entry) {
        return browserify({ entries: [entry] })
            .bundle()
            .pipe(source(entry))
            // .pipe(rename( ))
            .pipe(gulp.dest('./dist'));
    });

    //return browserify('./src/app/chrome-extension/scripts/background/index.js').bundle()
    //    .pipe(source('background.js'))
    //    .pipe(gulp.dest('./dist/chrome-dev/scripts'));
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
