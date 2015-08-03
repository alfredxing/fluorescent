'use strict';

import rangy from 'rangy';
import utils from './utils/utils';
import Broadcaster from './Broadcaster';
import Annotation from './Annotation';
import AnnotationApplier from './AnnotationApplier';

export default class Annotator extends Broadcaster {

  constructor(window, annotations, options = {}) {
    super();

    this.document = window.document;
    this._url = window.location.href;
    this._host = window.location.hostname;

    this._startSignals('added', 'removed', 'edited');

    this._highlightListeners = [];

    this._annotationAppliers = [];
    annotations.forEach(annotation => this._addAnnotation(annotation));
  }

  get url() {
    return this._url;
  }
  get host() {
    return this._host;
  }

  uncap() {
    return new Promise((resolve, reject) => this._addHighlightListener(() => {
      let annotation = this._highlight();
      resolve(this._addAnnotation(annotation));
      this.cap();
    }));
  }

  cap() {
    console.log('capped');
    this._clearHighlightListeners();
  }

  edit(annotation) {

  }

  erase(annotation) {

  }

  illuminate() {
    this._annotationAppliers.forEach(applier => applier.show());
  }

  darken() {
    this._annotationAppliers.forEach(applier => applier.hide());
  }

  _addAnnotation(annotation) {
    if (annotation) {
      let applier = new AnnotationApplier(annotation);

      applier.removed.add(this._handleChildRemoved);
      applier.edited.add(this._handleChildEdited);

      this._annotationAppliers.push(applier);
    }

    return annotation;
  }

  _editAnnotation(annotation) {

  }

  _removeAnnotation(annotation) {

  }

  _highlight() {
    let selection = rangy.getSelection(),
        containerNode = null || this.document;

    if (selection.isCollapsed) { return null; }

    let url = this.url,
        position = utils.serialize(selection, containerNode),
        host = this.host,
        summary = utils.abbreviate(selection.toString(), 200);

    selection.removeAllRanges();

    return new Annotation(url, position, host, summary);
  }

  _addHighlightListener(listener) {
    if (listener && this._highlightListeners.length === 0) {
      this._highlightListeners.push(listener);
      this.document.addEventListener('mouseup', listener);
    }
  }

  _clearHighlightListeners() {
    while (this._highlightListeners.length) {
      let listener = this._highlightListeners.pop();
      this.document.removeEventListener('mouseup', listener);
    }
  }

  _handleChildRemoved(annotation) {
    // TODO: find and delete applier for annotation
    this.removed.dispatch(annotation);
  }

  _handleChildEdited(annotation) {
    this.edited.dispatch(annotation);
  }

}
