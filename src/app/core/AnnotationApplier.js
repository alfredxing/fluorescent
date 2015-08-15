'use strict';

import utils from './utils/utils';
import Broadcaster from './Broadcaster';

export default class AnnotationApplier extends Broadcaster {

  constructor(window, annotation) {
    super();
    this.document = window.document;
    this._annotation = annotation;

    this._className = 'fl-highlight-' + Date.now();
    this._range = utils.deserialize(this.document, this._annotation.position);
    this.apply();

    this._startSignals('removed', 'edited');
  }

  apply() {
    let elements = utils.applyClassToRange(
      this.document, this._range, this._className
    );

    elements.forEach(el => {
      el.style.backgroundColor = 'rgba(0,220,63,0.4)';
      el.addEventListener('mouseenter', this._handleTextHover);
      el.addEventListener('mouseleave', this._handleTextUnhover);
      el.addEventListener('click', this._handleTextClick);
    });
  }

  unapply() {
    console.log(this._range.toString());
    utils.unapplyClassToRange(document, this._range, this._className);
  }

  _handleTextHover() {
    console.log('entered');
  }

  _handleTextUnhover() {
  }

  _handleTextClick() {
    window.alert('clicked');
  }

}
