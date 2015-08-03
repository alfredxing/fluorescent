'use strict';

import Broadcaster from './Broadcaster';

export default class AnnotationApplier extends Broadcaster {

  constructor(annotation) {
    super();

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
