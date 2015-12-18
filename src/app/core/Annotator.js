'use strict';

import utils from './utils/utils';
import Broadcaster from './Broadcaster';
import Highlighter from './Highlighter';
import CommentList from './CommentList';
import AnnotationApplier from './AnnotationApplier';

export default class Annotator extends Broadcaster {

  constructor(window, annotations = [], options = {}) {
    super();
    this.window = window;
    this.highlighter = new Highlighter(window);

    this._commentList = new CommentList(this.window);

    this._annotationAppliers = [];
    annotations.forEach(annotation => this._addAnnotation(annotation));

    ['_handleHighlight', '_handleChildEdited', '_handleChildRemoved']
      .forEach(fnName => this[fnName] = this[fnName].bind(this));

    this._startSignals('added', 'removed', 'edited');
  }

  uncap() {
    this.highlighter.uncap(this._handleHighlight);
  }

  cap() {
    this.highlighter.cap();
  }

  edit(annotation) {

  }

  erase(annotation) {

  }

  illuminate() {
    this._annotationAppliers.forEach(applier => applier.apply());
  }

  darken() {
    this._annotationAppliers.forEach(applier => applier.unapply());
  }

  _addAnnotation(annotation) {
    if (annotation) {
      let applier = new AnnotationApplier(this.window, annotation);

      applier.removed.add(this._handleChildRemoved);
      applier.edited.add(this._handleChildEdited);

      this._annotationAppliers.push(applier);
      this._commentList.addComment(
        annotation.id,
        annotation.comment,
        applier.getYOffset()
      );
    }

    return annotation;
  }

  _editAnnotation(annotation) {

  }

  _removeAnnotation(annotation) {

  }

  _handleHighlight(annotation) {
    this._addAnnotation(annotation);
    this.added.dispatch(annotation);
    this.highlighter.cap();
  }

  _handleChildRemoved(annotation) {
    // TODO: find and delete applier for annotation
    this.removed.dispatch(annotation);
  }

  _handleChildEdited(annotation) {
    this.edited.dispatch(annotation);
  }

}
