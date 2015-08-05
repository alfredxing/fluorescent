'use strict';

import utils from './utils/utils';
import Broadcaster from './Broadcaster';

export default class AnnotationApplier extends Broadcaster {

  constructor(window, annotation) {
    super();
    this.document = window.document;
    this._annotation = annotation;

    this._classApplier = utils.getClassApplier('fl-highlight-' + Date.now());
    this._ranges = utils.deserialize(this.document, this._annotation.position);
    this.apply();

    this._startSignals('removed', 'edited');
  }

  apply() {
    this._ranges = this._classApplier.applyToRanges(this._ranges);
    let elements = utils.getClassApplierElements(
      this._classApplier,
      this._ranges
    );

    elements.forEach(el => {
      el.addEventListener('mouseenter', this._handleTextHover);
      el.addEventListener('mouseleave', this._handleTextUnhover);
      el.addEventListener('click', this._handleTextClick);
    });
  }

  unapply() {
    this._ranges = this._classApplier.undoToRanges(this._ranges);
  }

  _handleTextHover() {
    console.log('entered');
  }

  _handleTextUnhover() {
  }

  _handleTextClick() {
    alert('clicked');
  }

}
