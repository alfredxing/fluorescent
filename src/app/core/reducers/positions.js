'use strict';

import { types } from '../actions/positions';

const positions = (state={}, action) => {
  switch (action.type) {
    case types.PUT_POSITION:
      return { ...state, [action.id]: action.yCoord };
    case types.DEL_POSITION:
      return state;
    default:
      return state;
  }
};

export default positions;
