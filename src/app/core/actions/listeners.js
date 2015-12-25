'use strict';

const ADD_LISTENER = 'ADD_LISTENER';

export const types = { ADD_LISTENER };
export const events = {
  SET:  'set',
  ADD:  'add',
  DEL:  'delete',
  EDIT: 'edit'
};

export function addListener(evt, listener) {
  return { type: ADD_LISTENER, evt, listener };
}
