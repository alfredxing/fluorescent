'use strict';

import utils from './utils/utils';
import Annotation from './Annotation';
import observeStore from './store/observeStore';
import { uncappedSelector, reselectSelector } from './selectors/uiSelectors';
import { addAndNotify, editAndNotify } from './actions/annotations';
import { cap, setReselect } from './actions/ui';

export default class Pen {

  constructor(store) {
    let url = utils.getPageUrl(window),
        host = utils.getPageHost(window);

    this.url = url;
    this.host = host;
    this.listeners = [];
    this.store = store;

    observeStore(store, uncappedSelector, this.handleUncapped.bind(this));
    observeStore(store, reselectSelector, this.handleReselect.bind(this));
  }

  handleUncapped(uncapped) {
    if (!uncapped) {
      return this.clearListeners();
    }

    this.addListener(() => {
      let selectedRange = utils.getSelectedRange(document);

      if (!selectedRange.collapsed) {
        let annotation = this.buildAnnotation(selectedRange);
        this.store.dispatch(cap());
        this.store.dispatch(addAndNotify(annotation));
      }
    });
  }

  handleReselect(id) {
    if (!id) {
      return this.clearListeners();
    }

    this.addListener(() => {
      let selectedRange = utils.getSelectedRange(document);

      if (!selectedRange.collapsed) {
        let position = utils.serialize(document, selectedRange);
        this.store.dispatch(setReselect(null));
        this.store.dispatch(editAndNotify(id, { position }));
      }
    });
  }

  buildAnnotation(range) {
    let url = this.url,
        position = utils.serialize(document, range),
        host = this.host,
        summary = utils.abbreviate(range.toString(), 200);

    return new Annotation(url, position, host, summary, '');
  }

  addListener(listener) {
    if (listener && this.listeners.length === 0) {
      this.listeners.push(listener);
      document.addEventListener('mouseup', listener);
    }
  }

  clearListeners() {
    while (this.listeners.length) {
      let listener = this.listeners.pop();
      document.removeEventListener('mouseup', listener);
    }
  }

}
