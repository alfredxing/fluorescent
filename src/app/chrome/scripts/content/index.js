'use strict';

import Annotator from '../../../core/Annotator';

chrome.promise = new ChromePromise();

let annotator;

function init() {
  return chrome.promise.runtime.sendMessage({
    type: 'findByUrl',
    url: window.location.href
  }).then(annotations => {
    annotator = new Annotator(window, annotations);
    attachListeners(annotator);
  });
}

function attachListeners(annotator) {
  annotator.added.add(annotation => true); // TODO
  annotator.removed.add(annotation => true); // TODO
  annotator.edited.add(annotation => true); // TODO
}

init(); window.addEventListener('hashchange', init);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('message received: ' + message.type);

  switch (message.type) {
    case 'illuminate':
      break;
    case 'darken':
      break;

    case 'uncap':
      annotator.uncap().then(annotation =>
        chrome.promise.runtime.sendMessage({
          type: 'save',
          annotation
        })
      ).then(result =>
        console.log('annotation saved with id: ' + result)
      );
      break;
    case 'cap':
      annotator.cap();
      break;

    default:
      console.log('error, unsupported message');
  }
});
