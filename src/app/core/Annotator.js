'use strict';

import rangy from 'rangy';
import Annotation from './Annotation';

export default class Annotator {
  constructor(document, options = {}) {
    this.document = document;
    this._url = options.url;
    this._host = options.host;

    this._highlight = this._highlight.bind(this);
  }

  get url() {
    return this._url;
  }

  set url(newUrl) {
    if (newUrl) { this._url = newUrl; }
  }

  get host() {
    return this._host;
  }

  set host(newHost) {
    if (newHost) { this._host = newHost; }
  }

  uncap() {
    this.document.addEventListener('mouseup', this._highlight);
  }

  cap() {
    this.document.removeEventListener('mouseup', this._highlight);
    console.log('capped');
  }

  illuminate() {
    console.log('illuminating');
  }

  darken() {
    console.log('darkening');
  }

  _highlight() {
    let selection = rangy.getSelection();

    // TODO: attempt to get closest node with id, otherwise default to document
    let containerNode = null || this.document;

    let text     = selection.toString(),
        bookmark = selection.getBookmark(containerNode);

    console.log(text);

    this.cap();
  }
}
