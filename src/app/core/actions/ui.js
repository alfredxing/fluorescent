'use strict';

const ILLUMINATE  = 'ILLUMINATE',
      DARKEN      = 'DARKEN',
      SET_HOVERED = 'SET_HOVERED',
      SET_FOCUSED = 'SET_FOCUSED',
      UNSET_ALL   = 'UNSET_ALL',
      UNCAP       = 'UNCAP',
      CAP         = 'CAP';

export const types = {
  ILLUMINATE, DARKEN, SET_HOVERED, SET_FOCUSED, UNSET_ALL, UNCAP, CAP
};

export function illuminate() {
  return { type: ILLUMINATE };
}

export function darken() {
  return { type: DARKEN };
}

export function setHovered(id) {
  return { type: SET_HOVERED, id };
}

export function setFocused(id) {
  return { type: SET_FOCUSED, id };
}

export function unsetAll() {
  return { type: UNSET_ALL };
}

export function uncap() {
  return { type: UNCAP };
}

export function cap() {
  return { type: CAP };
}
