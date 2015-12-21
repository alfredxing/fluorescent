'use strict';

import Database from '../../../core/Database.js';

let db = new Database();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case 'save':
      db.save(message.annotation).then(result =>
        sendResponse(result)
      );
      break;
    case 'delete':
      db.delete(message.id).then(() =>
        sendResponse()
      );
      break;
    case 'find':
      break;
    case 'findByUrl':
      db.findByUrl(message.url).then(result =>
        sendResponse(result)
      );
      break;
    case 'clear':
      db.clear().then(() =>
        sendResponse()
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
