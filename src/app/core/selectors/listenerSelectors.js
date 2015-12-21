'use strict';

export const listenersSelector = state => state.listeners;

export const setListenersSelector  = state => listenersSelector(state).set;
export const addListenersSelector  = state => listenersSelector(state).add;
export const delListenersSelector  = state => listenersSelector(state).del;
export const editListenersSelector = state => listenersSelector(state).edit;
