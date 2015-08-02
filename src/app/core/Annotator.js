'use strict';

import rangy from 'rangy';
import Annotation from './Annotation';

export default class Annotator {

  constructor(document, options = {}) {
    this.document = document;
    this._url = options.url;
    this._host = options.host;
    this._listeners = [];
  }

  _highlight() {
    let selection = rangy.getSelection();

    // TODO: attempt to get closest node with id, otherwise default to document
    let containerNode = null || this.document;

    let text     = selection.toString(),
        bookmark = selection.getBookmark(containerNode);

    return text;
  }

  _addListener(listener) {
    if (listener) {
      this._listeners.push(listener);
      this.document.addEventListener('mouseup', listener);
    }
  }

  _clearListeners() {
    while (this._listeners.length) {
      let listener = this._listeners.pop();
      this.document.removeEventListener('mouseup', listener);
    }
  }

  uncap() {
    return new Promise((resolve, reject) => this._addListener(() => {
      resolve(this._highlight());
      this.cap();
    }));
  }

  cap() {
    console.log('capped');
    this._clearListeners();
  }

  illuminate() {
    console.log('illuminating');
  }

  darken() {
    console.log('darkening');
  }

}
