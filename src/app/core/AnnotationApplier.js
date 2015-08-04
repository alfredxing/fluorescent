'use strict';

import utils from './utils/utils';
import Broadcaster from './Broadcaster';
import rangy from 'rangy';

export default class AnnotationApplier extends Broadcaster {

  constructor(window, annotation) {
    super();
    this.document = window.document;
    this._annotation = annotation;
    this.apply();

    this._startSignals('removed', 'edited');
  }

  apply() {
    // TODO: what to do when there are multiple ranges? How do multiple range
    // selections exist?
    let ranges = utils.deserialize(this.document, this._annotation.position);
  }

  unapply() {

  }

  show() {

  }

  hide() {

  }

  update() {

  }

}
