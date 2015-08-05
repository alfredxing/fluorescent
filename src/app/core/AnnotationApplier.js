'use strict';

import rangy from 'rangy';
import 'rangy/lib/rangy-classapplier';

import utils from './utils/utils';
import Broadcaster from './Broadcaster';

export default class AnnotationApplier extends Broadcaster {

  constructor(window, annotation) {
    super();
    this.document = window.document;
    this._annotation = annotation;

    rangy.init();
    this._classApplier = this._initClassApplier('fl-highlight-' + Date.now());
    this._ranges = utils.deserialize(this.document, this._annotation.position);
    this.apply();

    this._startSignals('removed', 'edited');
  }

  apply() {
    this._ranges = this._classApplier.applyToRanges(this._ranges);
    let elements = this._getElements(this._classApplier, this._ranges);

    elements.forEach(el => {
      el.addEventListener('mouseenter', this._handleTextHover);
      el.addEventListener('mouseleave', this._handleTextUnhover);
      el.addEventListener('click', this._handleTextClick);
    });
  }

  unapply() {
    this._ranges = this._classApplier.undoToRanges(this._ranges);
  }

  _initClassApplier(className) {
    return rangy.createClassApplier(className, {
      elementAttributes: { style: 'background-color: rgba(0,220,63,0.4)'}
    });
  }

  _getElements(classApplier, ranges) {
    return ranges
      .map(range => classApplier.getElementsWithClassIntersectingRange(range))
      .reduce((a,b) => a.concat(b));
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
