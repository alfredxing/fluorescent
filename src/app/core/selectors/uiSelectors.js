'use strict';

export const uiSelectors      = state => state.ui;
export const hoveredSelector  = state => state.ui.hoveredId;
export const focusedSelector  = state => state.ui.focusedId;
export const reselectSelector = state => state.ui.reselectId;
export const uncappedSelector = state => state.ui.uncapped;
export const showSelector     = state => state.ui.show;
