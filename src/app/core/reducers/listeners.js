'use strict';

import { types } from '../actions/listeners';

const listeners = (state, action) => {
  state = state || { 'set': [], 'add': [], 'delete': [], 'edit': [] };

  switch (action.type) {
    case types.ADD_LISTENER:
      let evt = action.evt;
      return {
        ...state,
        [evt]: [...state[evt], action.listener]
      };
    default:
      return state;
  }
};

export default listeners;
