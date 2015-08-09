'use strict';

import Rx from 'rx';
import utils from './utils/utils';
import Annotation from './Annotation';

export default class Highlighter {

  constructor(window) {
    this.document = window.document;
    this._url = utils.getPageUrl(window);
    this._host = utils.getPageHost(window);

    this._stream = Rx.Observable.fromEvent(this.document, 'mouseup')
      .map(() => utils.getSelection())
      .filter(selection => !selection.isCollapsed);
    this._observers = [];
  }

  uncap(cb) {
    if (this._observers.length === 0) {
      let observer = this._stream.subscribe(selection => {
        let containerNode = null || this.document.body,
            annotation    = this._buildAnnotation(selection, containerNode);

        selection.removeAllRanges();
        cb(annotation);
      });

      this._observers.push(observer);
    }
  }

  cap() {
    while (this._observers.length) {
      let observer = this._observers.pop();
      observer.dispose();
    }
  }

  _buildAnnotation(selection, containerNode) {
    let url = this._url,
        position = utils.serialize(selection, containerNode),
        host = this._host,
        summary = utils.abbreviate(selection.toString(), 200);

    return new Annotation(url, position, host, summary);
  }

}
