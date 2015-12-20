'use strict';

import { types } from '../actions/ui';

const ui = (state, action) => {
  state = state || {
    hoveredId: null,
    focusedId: null,
    show: true,
    uncapped: false
  };

  switch (action.type) {
    case types.ILLUMINATE:
      return {
        ...state,
        show: true
      };
    case types.DARKEN:
      return {
        ...state,
        show: false
      };
    case types.SET_HOVERED:
      return {
        ...state,
        hoveredId: types.id
      };
    case types.SET_FOCUSED:
      return {
        ...state,
        focusedId: types.id
      };
    case types.UNSET_ALL:
      return {
        ...state,
        hoveredId: null,
        focusedId: null
      };
    case types.UNCAP:
      return {
        ...state,
        uncapped: true
      };
    case types.CAP:
      return {
        ...state,
        uncapped: false
      };
    default:
      return state;
  }
};

export default ui;
