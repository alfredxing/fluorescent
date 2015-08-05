'use strict';

import utils from './utils/utils';
import Annotation from './Annotation';

export default class Highlighter {

  constructor(window) {
    this.document = window.document;
    this._url = utils.getPageUrl(window);
    this._host = utils.getPageHost(window);

    this._listeners = [];
  }

  uncap(cb) {
    this._addListener(() => {
      let selection     = utils.getSelection(),
          containerNode = null || this.document.body,
          annotation    = this._buildAnnotation(selection, containerNode);

      cb(annotation);
    });
  }

  cap() {
    this._clearListeners();
  }

  _buildAnnotation(selection, containerNode) {
    if (selection.isCollapsed) { return null; }

    let url = this._url,
        position = utils.serialize(selection, containerNode),
        host = this._host,
        summary = utils.abbreviate(selection.toString(), 200);

    selection.removeAllRanges();

    return new Annotation(url, position, host, summary);
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

}
