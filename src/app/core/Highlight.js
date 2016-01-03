'use strict';

import { setHovered, setFocused } from './actions/ui';
import observeStore from './store/observeStore';
import {
  hoveredSelector,
  focusedSelector
} from './selectors/uiSelectors';
import utils from './utils/utils';

export default class Highlight {

  constructor(store, annotation) {
    this.store = store;
    this.annotation = annotation;
    this.range = utils.deserialize(document, annotation.position);
    this.className = 'fl-highlight-' + Date.now();
    this.elements = [];
    this.unsubscribeHover = null;
    this.unsubscribeFocus = null;
    this.focused = false;
    this.apply();
  }

  apply() {
    let els = utils.applyClassToRange(
      document, this.range, this.className
    );

    els.forEach(el => {
      el.style.backgroundColor = 'rgba(0,220,63,0.25)';
      el.style.display = 'inline';
      el.style.transition = 'background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
      // TODO: is bind making separate listeners for each element?
      el.addEventListener('mouseenter', this.handleTextHover.bind(this));
      el.addEventListener('mouseleave', this.handleTextUnhover.bind(this));
      el.addEventListener('click',      this.handleTextClick.bind(this));
    });

    this.elements = els;

    if (!this.unsubscribeStore && !this.unsubscribeFocus) {
      this.unsubscribeStore = observeStore(
        this.store, hoveredSelector, this.handleHovered.bind(this)
      );
      this.unsubscribeFocus = observeStore(
        this.store, focusedSelector, this.handleFocused.bind(this)
      );
    }
  }

  unapply() {
    utils.unapplyClassToRange(document, this.range, this.className);
    this.elements = [];
    if (this.unsubscribeStore && this.unsubscribeFocus) {
      this.unsubscribeStore();
      this.unsubscribeFocus();
      this.unsubscribeStore = null;
      this.unsubscribeFocus = null;
    }
  }

  update(annotation) {
    if (this.annotation.position !== annotation.position) {
      this.unapply();
      this.range = utils.deserialize(document, annotation.position);
      this.apply();
    }

    this.annotation = annotation;
  }

  getYOffset() {
    if (this.elements.length === 0) { return 0; }
    let rectangle = this.elements[0].getBoundingClientRect();
    return rectangle.top + window.scrollY;
  }

  // TODO: keep strengthened highlight when focused, activate hover from comment
  handleTextHover() {
    this.store.dispatch(setHovered(this.annotation.id));
  }

  handleTextUnhover() {
    this.store.dispatch(setHovered(null));
  }

  handleHovered(id) {
    let isHovered = id === this.annotation.id;
    this.setColor(isHovered || this.focused);
  }

  handleFocused(id) {
    let isFocused = id === this.annotation.id;
    this.focused = isFocused;
    this.setColor(isFocused);
  }

  setColor(isActive) {
    this.elements.forEach(el => {
      el.style.backgroundColor = `rgba(0,220,63, ${isActive ? 0.4 : 0.25})`;
    });
  }

  handleTextClick(e) {
    e.stopImmediatePropagation();
    this.store.dispatch(setFocused(this.annotation.id));
  }

}
