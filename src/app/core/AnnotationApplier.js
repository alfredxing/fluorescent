'use strict';

import utils from './utils/utils';
import Broadcaster from './Broadcaster';

export default class AnnotationApplier extends Broadcaster {

  constructor(window, annotation, classApplier) {
    super();
    this.document = window.document;
    this._annotation = annotation;
    this._classApplier = classApplier;
    this._ranges = utils.deserialize(this.document, this._annotation.position);
    this.apply();

    this._startSignals('removed', 'edited');
  }

  apply() {
    this._classApplier.applyToRanges(this._ranges);
  }

  unapply() {
    this._classApplier.undoToRanges(this._ranges);
  }

}
