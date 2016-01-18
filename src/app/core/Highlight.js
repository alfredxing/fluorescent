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
    this.hovered = false;
    this.focused = false;
    this.apply();
  }

  apply() {
    let els = utils.applyClassToRange(
      document, this.range, this.className
    );

    els.forEach(el => {
      el.style.display = 'inline';
      el.style.transition = 'background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
      // TODO: is bind making separate listeners for each element?
      el.addEventListener('mouseenter', this.handleTextHover.bind(this));
      el.addEventListener('mouseleave', this.handleTextUnhover.bind(this));
      el.addEventListener('click',      this.handleTextClick.bind(this));
    });

    this.elements = els;
    this.refreshColor();

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
    let prev = this.annotation;
    this.annotation = annotation;

    if (this.annotation.position !== prev.position) {
      this.unapply();
      this.range = utils.deserialize(document, annotation.position);
      this.apply();
    } else if (this.annotation.color !== prev.color) {
      this.refreshColor();
    }
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
    this.hovered = id === this.annotation.id;
    this.refreshColor();
  }

  handleFocused(id) {
    this.focused = id === this.annotation.id;
    this.refreshColor();
  }

  refreshColor() {
    let isActive = this.hovered || this.focused
      , {r,g,b} = utils.hexToRGB(this.annotation.color || '#00DC3F')
      , rgbaStr = `rgba(${r},${g},${b},${isActive ? 0.4 : 0.25})`;

    this.elements.forEach(el => {
      el.style.backgroundColor = rgbaStr;
    });
  }

  handleTextClick(e) {
    e.stopImmediatePropagation();
    this.store.dispatch(setFocused(this.annotation.id));
  }

}
