'use strict';

import utils from './utils/utils';

export default class Highlight {

  constructor(annotation) {
    this.annotation = annotation;
    this.range = utils.deserialize(document, annotation.position);
    this.className = 'fl-highlight-' + Date.now();
    this.elements = [];
    this.apply();
  }

  apply() {
    let els = utils.applyClassToRange(
      document, this.range, this.className
    );

    els.forEach(el => {
      el.style.backgroundColor = 'rgba(0,220,63,0.4)';
      el.style.display = 'inline';
      el.addEventListener('mouseenter', this.handleTextHover);
      el.addEventListener('mouseleave', this.handleTextUnhover);
      el.addEventListener('click', this.handleTextClick);
    });

    this.elements = els;
  }

  unapply() {
    utils.unapplyClassToRange(document, this.range, this.className);
    this.elements = [];
  }

  getYOffset() {
    if (this.elements.length === 0) { return 0; }
    let rectangle = this.elements[0].getBoundingClientRect();
    return rectangle.top + window.scrollY;
  }

  handleTextHover() {
    console.log('entered');
  }

  handleTextUnhover() {
  }

  handleTextClick() {
    window.alert('clicked');
  }

}
