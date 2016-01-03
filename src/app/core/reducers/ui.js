'use strict';

import { types } from '../actions/ui';

const ui = (state, action) => {
  state = state || {
    hoveredId: null,
    focusedId: null,
    reselectId: null,
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
        hoveredId: action.id
      };
    case types.SET_FOCUSED:
      return {
        ...state,
        focusedId: action.id
      };
    case types.UNSET_ALL:
      return {
        ...state,
        hoveredId: null,
        focusedId: null
      };
    case types.SET_RESELECT:
      return {
        ...state,
        reselectId: action.id
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
