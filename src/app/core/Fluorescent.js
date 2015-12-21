'use strict';

import riot from 'riot';
import mixin from 'riot-redux-mixin';
import configureStore from './store/configureStore';
import { addListener, events } from './actions/listeners';
import { illuminate, darken, uncap, cap } from './actions/ui';
import {
  setAndNotify, editAndNotify, deleteAndNotify
} from './actions/annotations';

import './components/commentList';
import Highlighter from './Highlighter';
import Pen from './Pen';

export default class Fluorescent {

  constructor() {
    let store = configureStore(),
        highlighter = new Highlighter(store),
        pen = new Pen(store);

    let { commentList, style } = initContainer();

    this.store = store;
    this.highlighter = highlighter;
    this.pen = pen;

    riot.mixin('redux', mixin(store));
    riot.mount(commentList, 'commentList', { style });
  }

  subscribe(evt, cb) {
    if (evt === events.ADD || evt === events.DEL || evt === events.EDIT) {
      this.store.dispatch(addListener(evt, cb));
    }
  }

  uncap() {
    this.store.dispatch(uncap());
  }

  cap() {
    this.store.dispatch(cap());
  }

  set(annotations) {
    this.store.dispatch(setAndNotify(annotations));
  }

  edit(id, merges) {
    this.store.dispatch(editAndNotify(id, merges));
  }

  erase(id) {
    this.store.dispatch(deleteAndNotify(id));
  }

  illuminate() {
    this.store.dispatch(illuminate());
  }

  darken() {
    this.store.dispatch(darken());
  }

}

function initContainer() {
  let container = document.createElement('fl-comments-' + Date.now()),
      shadow    = container.createShadowRoot();

  container.style.cssText = `
    width: 340px;
    position: absolute;
    display: block;
    top: 0;
    right: 0;
    z-index: 9999;
  `;

  let style       = document.createElement('style'),
      commentList = document.createElement('commentList');

  shadow.resetStyleInheritance = true;
  shadow.appendChild(style);
  shadow.appendChild(commentList);

  document.body.appendChild(container);

  return { commentList, style };
}
