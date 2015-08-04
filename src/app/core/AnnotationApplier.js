'use strict';

import Broadcaster from './Broadcaster';

export default class AnnotationApplier extends Broadcaster {

  constructor(window, annotation) {
    super();
    this.document = window.document;
    this._annotation = annotation;

    this._startSignals('removed', 'edited');
  }

  apply() {

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
