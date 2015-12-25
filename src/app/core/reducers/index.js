import { combineReducers } from 'redux';
import annotations from './annotations';
import ui from './ui';
import listeners from './listeners';
import positions from './positions';

const rootReducer = combineReducers({
  annotations, ui, listeners, positions
});

export default rootReducer;
