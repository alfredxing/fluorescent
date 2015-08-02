'use strict';

import Storage from '../../../core/Storage.js';

let storage = new Storage();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case 'save':
      storage.create(message.annotation).then(result =>
        sendResponse(result)
      );
      break;
    case 'delete':
      break;
    case 'find':
      break;
    case 'findByUrl':
      storage.findByUrl(message.url).then(result =>
        sendResponse(result)
      );
      break;
    default:
      console.log('error, unsupported message');
      sendResponse('unsupported');
  }

  return true;
});

chrome.runtime.onInstalled.addListener(details => {
  console.log('starting up');
});
