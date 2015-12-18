'use strict';

import Signal from 'signals';
import Highlighter from './Highlighter';
import CommentList from './CommentList';
import AnnotationApplier from './AnnotationApplier';

export default function AnnotatorFactory(window, annotations = []) {

  let highlighter = HighlighterFactory();

  let events = {}, eventNames = [
    'created',
    'updated',
    'deleted',

    'highlighted',
    'rehighlighted',

    'inkHovered',
    'inkUnhovered',
    'inkClicked',

    'changeColorClicked',
    'changePositionClicked'
  ];

  eventNames.forEach(eventName => events[eventName] = new Signal());

  let handlers = {
    highlighted(msg) {
      addAnnotation(annotation);
      events.created.dispatch(msg.annotation);
      highlighter.cap();
    },
    rehighlighted(msg) {

    },

    inkHovered(msg) {

    },
    inkUnhovered(msg) {

    },
    inkClicked(msg) {

    },

    changeColorClicked() {

    },
    changePositionClicked() {

    }
  };

  function uncap() {

  }

  function cap() {

  }

  function edit() {

  }

  function erase() {

  }

  function illuminate() {

  }

  function darken() {

  }

  return {events, uncap, cap, edit, erase, illuminate, darken};

}