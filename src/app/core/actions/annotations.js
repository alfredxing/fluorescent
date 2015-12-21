'use strict';

import { annotationsSelector } from '../selectors/annotationSelectors';
import {
  setListenersSelector,
  addListenersSelector,
  delListenersSelector,
  editListenersSelector
} from '../selectors/listenerSelectors';

const SET_ANNOTATIONS  = 'SET_ANNOTATIONS',
      ADD_ANNOTATION   = 'ADD_ANNOTATION',
      DEL_ANNOTATION   = 'DEL_ANNOTATION',
      EDIT_ANNOTATION  = 'EDIT_ANNOTATION';

export const types = {
  SET_ANNOTATIONS, ADD_ANNOTATION, DEL_ANNOTATION, EDIT_ANNOTATION
};

function setAnnotations(annotations) {
  return { type: SET_ANNOTATIONS, annotations };
}

function addAnnotation(annotation) {
  return { type: ADD_ANNOTATION, annotation };
}

function deleteAnnotation(id) {
  return { type: DEL_ANNOTATION, id };
}

function editAnnotation(annotation) {
  return { type: EDIT_ANNOTATION, annotation };
}

function notify(subject, listeners=[]) {
  return Promise.all(
    listeners.map(cb => cb(subject)).filter(a => !!a)
  );
}

export function setAndNotify(annotations) {
  return (dispatch, getState) => {
    dispatch(setAnnotations(annotations));
    return notify({ annotations }, setListenersSelector(getState()));
  };
}

export function addAndNotify(annotation) {
  return (dispatch, getState) => {
    dispatch(addAnnotation(annotation));
    return notify({ annotation }, addListenersSelector(getState()));
  };
}

export function deleteAndNotify(id) {
  return (dispatch, getState) => {
    dispatch(deleteAnnotation(id));
    return notify({ id }, delListenersSelector(getState()));
  };
}

export function editAndNotify(id, merges) {
  return (dispatch, getState) => {
    let annotations = annotationsSelector(getState());

    let index = annotations.findIndex(a => a.id === id);
    if (index < 0) { return; }

    let annotation = { ...annotations[index], ...merges };

    dispatch(editAnnotation(annotation));
    return notify({ annotation }, editListenersSelector(getState()));
  };
}
