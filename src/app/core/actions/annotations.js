'use strict';

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

function editAnnotation(id, merges) {
  return { type: EDIT_ANNOTATION, id, merges };
}

function notify(subject, listeners=[]) {
  return Promise.all(
    listeners.map(cb => cb(subject)).filter(a => !!a)
  );
}

export function setAndNotify(annotations) {
  return (dispatch, getState) => {
    dispatch(setAnnotations(annotations));
    return notify({ annotations }, getState().listeners.set);
  };
}

export function addAndNotify(annotation) {
  return (dispatch, getState) => {
    dispatch(addAnnotation(annotation));
    return notify({ annotation }, getState().listeners.add);
  };
}

export function deleteAndNotify(id) {
  return (dispatch, getState) => {
    dispatch(deleteAnnotation(id));
    return notify({ id }, getState().listeners.del);
  };
}

export function editAndNotify(id, merges) {
  return (dispatch, getState) => {
    dispatch(editAnnotation(id, merges));
    return notify({ id, merges }, getState().listeners.edit);
  };
}
