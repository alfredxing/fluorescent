'use strict';

import utils from './utils/utils';
import Broadcaster from './Broadcaster';

export default class AnnotationApplier extends Broadcaster {

  constructor(window, annotation) {
    super();
    this.window = window;
    this.document = window.document;
    this._annotation = annotation;

    this._className = 'fl-highlight-' + Date.now();
    this._range = utils.deserialize(this.document, this._annotation.position);
    this._elements = [];
    this.apply();

    this._startSignals('removed', 'edited');
  }

  apply() {
    let els = utils.applyClassToRange(
      this.document, this._range, this._className
    );

    els.forEach(el => {
      el.style.backgroundColor = 'rgba(0,220,63,0.4)';
      el.style.display = 'inline';
      el.addEventListener('mouseenter', this._handleTextHover);
      el.addEventListener('mouseleave', this._handleTextUnhover);
      el.addEventListener('click', this._handleTextClick);
    });

    this._elements = els;
  }

  unapply() {
    utils.unapplyClassToRange(document, this._range, this._className);
  }

  getYOffset() {
    if (this._elements.length === 0) { return 0; }
    let rectangle = this._elements[0].getBoundingClientRect();
    return rectangle.top + this.window.scrollY;
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
