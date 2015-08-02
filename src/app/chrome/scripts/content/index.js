'use strict';

import Annotator from '../../../core/Annotator';

let annotator = new Annotator(window);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('message received: ' + message.type);

  switch (message.type) {
    case "illuminate":
      break;
    case "darken":
      break;

    case "uncap":
      annotator.uncap().then((annotation) =>
        console.log('click promise resolved: ' + JSON.stringify(annotation))
      );
      break;
    case "cap":
      annotator.cap();
      break;

    default:
      console.log("error, unsupported message");
  }
});

window.addEventListener('hashchange', () => {
  annotator = new Annotator(window);
});
