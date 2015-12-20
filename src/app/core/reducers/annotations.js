'use strict';

import { types } from '../actions/annotations';

const annotations = (state=[], action) => {
  switch (action.type) {
    case types.SET_ANNOTATIONS:
      return [...action.annotations];
    case types.ADD_ANNOTATION:
      return (action.annotation) ? [...state, types.annotation] : state;
    case types.DEL_ANNOTATION:
      return (action.id) ? state.filter(a => a.id != id) : state;
    case types.EDIT_ANNOTATION:
      return state;
    default:
      return state;
  }
};

export default annotations;
