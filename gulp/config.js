'use strict';

module.exports = {
  base: {
    src: 'src/app/chrome/',
    dest: './dist/chrome-dev/',

    prod: {
      dest: './dist/chrome/'
    }
  },
  bower: {
    dest: './dist/chrome-dev/lib/',

    prod: {
      dest: './dist/chrome/lib/'
    }
  },
  styles: {
    src: './src/app/chrome/styles/*.scss',
    dest: './dist/chrome-dev/styles/',

    prod: {
      dest: './dist/chrome/styles'
    }
  },
  lint: {
    src: './src/app/**/*.js'
  },
  scripts: {
    src: './src/app/chrome/scripts/',
    dest: './dist/chrome-dev/scripts/',
    bundles: ['background', 'content', 'options', 'popup'],
    entry: 'index.js',

    prod: {
      dest: './dist/chrome/scripts/'
    }
  },
  images: {
    src: './src/app/chrome/images/',
    dest: './dist/chrome-dev/images/',

    iconSrc: './src/app/chrome/images/logo.svg',
    iconSizes: [19,38,16,32,48,64,96,128,256],

    prod: {
      dest: './dist/chrome/images/'
    }
  },
  watch: {
    base:    ['src/app/chrome/manifest.json'],
    scripts: ['src/app/**/*.js'],
    styles:  ['src/app/chrome/styles/**/*.scss'],
    images:  ['src/app/chrome/images/**']
  }
};
