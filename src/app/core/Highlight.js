'use strict';

import { setHovered, setFocused } from './actions/ui';
import utils from './utils/utils';

export default class Highlight {

  constructor(store, annotation) {
    this.store = store;
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
      el.style.backgroundColor = 'rgba(0,220,63,0.25)';
      el.style.display = 'inline';
      el.style.transition = 'background-color 0.1s ease-in-out';
      // TODO: is bind making separate listeners for each element?
      el.addEventListener('mouseenter', this.handleTextHover.bind(this));
      el.addEventListener('mouseleave', this.handleTextUnhover.bind(this));
      el.addEventListener('click',      this.handleTextClick.bind(this));
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

  // TODO: keep strengthened highlight when focused, activate hover from comment
  handleTextHover() {
    this.store.dispatch(setHovered(this.annotation.id));
    this.elements.forEach(el => {
      el.style.backgroundColor = 'rgba(0,220,63,0.4)';
    });
  }

  handleTextUnhover() {
    this.store.dispatch(setHovered(null));
    this.elements.forEach(el => {
      el.style.backgroundColor = 'rgba(0,220,63,0.25)';
    });
  }

  handleTextClick(e) {
    e.stopImmediatePropagation();
    this.store.dispatch(setFocused(this.annotation.id));
  }

}
