'use strict';

import rangy from 'rangy';
import Annotation from './Annotation';

export default class Annotator {

  constructor(window, annotations, options = {}) {
    this.document = window.document;
    this._url = window.location.href;
    this._host = window.location.hostname;

    this._listeners = [];

    this._annotations = [];
    annotations.forEach(annotation => this._addAnnotation(annotation));
  }

  get url() {
    return this._url;
  }
  get host() {
    return this._host;
  }
  get annotations() {
    return this._annotations;
  }

  uncap() {
    return new Promise((resolve, reject) => this._addListener(() => {
      let annotation = this._highlight();
      resolve(this._addAnnotation(annotation));
      this.cap();
    }));
  }

  cap() {
    console.log('capped');
    this._clearListeners();
  }

  edit(annotation) {
    /* public API to modify an annotation, return a promise with the updated
       annotation object so additional steps can be taken (e.g. updating db
       records) */
  }

  erase(annotation) {
    /* public API to delete an annotation, return a promise with the deleted
       annotation object so additional steps can be taken (e.g. updating db
       records) */
  }

  illuminate() {
    /* public API to show all annotations */
  }

  darken() {
    /* public API to hide all annotations */
  }

  _addAnnotation(annotation) {
    if (annotation) {
      this._annotations.push(annotation);
      // TODO: logic to refresh DOM
    }

    return annotation;
  }

  _editAnnotation(annotation) {
    /* private method to edit an annotation, and update the DOM accordingly,
       returns the updated annotation */
  }

  _removeAnnotation(annotation) {
    /* private method to delete an annotation, and update the DOM accordingly,
       returns the deleted annotation */
  }

  _showAnnotation(annotation) {
    /* private method to make a single annotation visible in the DOM, called by
       this.illuminate() */
  }

  _hideAnnotation(annotation) {
    /* private method to hide a single annotation from the DOM, called by
       this.darken()  */
  }

  _highlight() {
    let selection = rangy.getSelection(),
        containerNode = null || this.document;

    if (selection.isCollapsed) { return null; }

    let url = this.url,
        position = this._serialize(selection, containerNode),
        host = this.host,
        summary = this._abbreviate(selection.toString(), 200);

    selection.removeAllRanges();

    return new Annotation(url, position, host, summary);
  }

  _serialize(selection, containerNode) {
    let ranges = selection.getAllRanges(),
        nodeId = this._getNodeIdentifier(containerNode);

    return ranges
      .map((range) => range.getBookmark(containerNode))
      .filter((bookmark) => bookmark.start !== bookmark.end)
      .map((bookmark) => bookmark.start + ':' + bookmark.end + ':' + nodeId)
      .reduce((a, b) => a + '$' + b);
  }

  _getNodeIdentifier(node) {
    return (node && node.nodeType == 1 && node.id) ? node.id : '/';
  }

  _abbreviate(str, length) {
    return str.trim().replace(/\s+/g, ' ').substr(0, length);
  }

  _addListener(listener) {
    if (listener && this._listeners.length === 0) {
      this._listeners.push(listener);
      this.document.addEventListener('mouseup', listener);
    }
  }

  _clearListeners() {
    while (this._listeners.length) {
      let listener = this._listeners.pop();
      this.document.removeEventListener('mouseup', listener);
    }
  }

}
