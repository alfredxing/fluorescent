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

  get url() {
    return this._url;
  }
  get host() {
    return this._host;
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

  _addListener(listener) {
    if (listener && this._listeners.length === 0) {
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

  _highlight() {
    let selection = rangy.getSelection(),
        containerNode = null || this.document;

    if (selection.isCollapsed) { return null; }

    let url = this.url,
        position = this._serialize(selection, containerNode),
        host = this.host,
        summary = this._abbreviate(selection.toString(), 200);

    selection.removeAllRanges();

    return new Annotation(url, position, host, summary);
  }

  _serialize(selection, containerNode) {
    let ranges = selection.getAllRanges(),
        nodeId = this._getNodeIdentifier(containerNode);

    return ranges
      .map((range) => range.getBookmark(containerNode))
      .filter((bookmark) => bookmark.start !== bookmark.end)
      .map((bookmark) => bookmark.start + ':' + bookmark.end + ':' + nodeId)
      .reduce((a, b) => a + '$' + b);
  }

  _getNodeIdentifier(node) {
    return (node && node.nodeType == 1 && node.id) ? node.id : '/';
  }

  _abbreviate(str, length) {
    return str.trim().replace(/\s+/g, ' ').substr(0, length);
  }

}
