'use strict';

module.exports = {
  base: {
    manifestSrc: 'src/app/chrome/manifest.json',
    dest: './dist/chrome-dev/',

    prod: {
      dest: './dist/chrome/'
    }
  },
  styles: {
    src: './src/app/chrome/styles/styles.scss',
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
