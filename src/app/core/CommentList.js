'use strict';

import popover from './templates/popover';
import Comment from './Comment';
import riot from 'riot';
import './components/comment';

export default class CommentList {

  constructor(window) {
    this.window = window;
    this.document = window.document;
    this._container = null;
    this._shadow = null;
    this.apply();

    this._comments = [];
  }

  addComment(id, content, yOffset = 0) {
    this._comments.push(
      new Comment(this.window, this._shadow, id, content, yOffset)
    );
  }

  removeComment(id) {

  }

  apply() {
    this._initContainer();
  }

  _initContainer() {
    let container = this.document.createElement('fl-comments-' + Date.now()),
        shadow    = container.createShadowRoot();

    container.style.cssText = `position:absolute;top:0;right:0;z-index:9999`;
    shadow.resetStyleInheritance = true;
    shadow.innerHTML = popover.style;

    this.document.body.appendChild(container);

    let comment = this.document.createElement('comment');
    let style = this.document.createElement('style');
    style.innerHTML = fontStyles;
    shadow.appendChild(style);
    shadow.appendChild(comment);
    riot.mount(comment, 'comment', {style});

    this._container = container; this._shadow = shadow;
  }

}

const fontStyles = `
  @font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: url(../resources/fonts/material-icons/MaterialIcons-Regular.eot); /* For IE6-8 */
    src: local('Material Icons'),
         local('MaterialIcons-Regular'),
         url(../resources/fonts/material-icons/MaterialIcons-Regular.woff2) format('woff2'),
         url(../resources/fonts/material-icons/MaterialIcons-Regular.woff) format('woff'),
         url(../resources/fonts/material-icons/MaterialIcons-Regular.ttf) format('truetype');
  }

  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;  /* Preferred icon size */
    display: inline-block;
    width: 1em;
    height: 1em;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;

    /* Support for all WebKit browsers. */
    -webkit-font-smoothing: antialiased;
    /* Support for Safari and Chrome. */
    text-rendering: optimizeLegibility;

    /* Support for Firefox. */
    -moz-osx-font-smoothing: grayscale;

    /* Support for IE. */
    font-feature-settings: 'liga';
  }
`;
