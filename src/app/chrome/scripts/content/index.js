'use strict';

import loadResources from './loadResources';
import utils from '../../../core/utils/utils';
import Annotator from '../../../core/Annotator';

chrome.promise = new ChromePromise();

let annotator;

function init() {
  loadResources();

  return chrome.promise.runtime.sendMessage({
    type: 'findByUrl',
    url: utils.getPageUrl(window)
  }).then(annotations => {
    if (annotator) { annotator.darken(); }
    annotator = new Annotator(window, annotations);
    attachListeners(annotator);
  });
}

init(); window.addEventListener('hashchange', init);

let listeners = {

  added(annotation) {
    chrome.promise.runtime.sendMessage({
      type: 'save',
      annotation
    }).then(id =>
      console.log('annotation saved with id: ' + id)
    );
  },

  removed(annotation) {
    console.log('annotation deleted: ' + JSON.stringify(annotation));
  },

  edited(annotation) {
    chrome.promise.runtime.sendMessage({
      type: 'save',
      annotation
    }).then(id =>
      console.log('annotation saved with id: ' + id)
    );
  }

};

function attachListeners(annotator) {
  annotator.added.add(listeners.added);
  annotator.removed.add(listeners.removed);
  annotator.edited.add(listeners.edited);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('message received: ' + message.type);

  switch (message.type) {
    case 'illuminate':
      annotator.illuminate();
      break;
    case 'darken':
      annotator.darken();
      break;

    case 'uncap':
      annotator.uncap();
      break;
    case 'cap':
      annotator.cap();
      break;

    default:
      console.log('error, unsupported message');
  }
});
