'use strict';

import "babel-polyfill";
import { types } from '../actions/annotations';

const annotations = (state=[], action) => {
  switch (action.type) {
    case types.SET_ANNOTATIONS:
      return [...action.annotations];
    case types.ADD_ANNOTATION:
      return (action.annotation) ? [...state, action.annotation] : state;
    case types.DEL_ANNOTATION:
      return (action.id) ? state.filter(a => a.id != action.id) : state;
    case types.EDIT_ANNOTATION:
      let annotation = action.annotation,
          index = state.findIndex(a => a.id == annotation.id);
      if (index < 0) { return state; }

      return [...state.slice(0, index), annotation, ...state.slice(index+1)];
    default:
      return state;
  }
};

export default annotations;
