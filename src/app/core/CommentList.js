'use strict';

import popover from './templates/popover';
import Comment from './Comment';
import riot from 'riot';
import './components/comment';

export default class CommentList {

  constructor(window, resourcePath) {
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
    shadow.appendChild(style);
    shadow.appendChild(comment);
    riot.mount(comment, 'comment', {style});

    this._container = container; this._shadow = shadow;
  }

}
