'use strict';

import observeStore from './store/observeStore';
import { addListener, events } from './actions/listeners';
import { putPosition, deletePosition } from './actions/positions';
import { showSelector } from './selectors/uiSelectors';
import Highlight from './Highlight';
import utils from './utils/utils';

export default class Highlighter {

  constructor(store, annotations=[]) {
    let highlights = {};

    annotations.forEach(annotation => this.handleAdd({ annotation }));

    this.store = store;
    this.highlights = highlights;
    this.show = true;

    store.dispatch(addListener(events.SET,  this.handleSet.bind(this)));
    store.dispatch(addListener(events.ADD,  this.handleAdd.bind(this)));
    store.dispatch(addListener(events.DEL,  this.handleDelete.bind(this)));
    store.dispatch(addListener(events.EDIT, this.handleEdit.bind(this)));

    observeStore(store, showSelector, this.handleShow.bind(this));
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  updatePosition(id, highlight) {
    this.store.dispatch(
      putPosition(id, highlight.getYOffset())
    );
  }

  handleSet({ annotations }) {
    annotations.forEach(annotation => this.handleAdd({ annotation }));
  }

  handleAdd({ annotation }) {
    let highlight = new Highlight(this.store, annotation);
    this.updatePosition(annotation.id, highlight);

    this.highlights[annotation.id] = highlight;
  }

  handleDelete({ id }) {
    let highlight = this.highlights[id];

    if (highlight) {
      highlight.unapply();
      delete this.highlights[id];
      this.store.dispatch(deletePosition(id));
    }
  }

  // TODO
  handleEdit({ id, merges }) {

  }

  handleShow(show) {
    this.show = show;
    utils.forIn(this.highlights, (id, highlight) => {
      if (show) {
        highlight.apply();
        // refresh the y coord of highlight when shown
        this.updatePosition(id, highlight);
      } else {
        highlight.unapply();
      }
    });
  }

  handleResize() {
    // don't recalculate y coords when hidden
    if (!this.show) { return; }

    utils.forIn(this.highlights, (id, highlight) => {
      this.updatePosition(id, highlight);
    });
  }

}
