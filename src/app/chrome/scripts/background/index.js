'use strict';

import Storage from '../../../core/Storage.js';

let storage = new Storage();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case "save":
      storage.create(message.annotation);
      break;
    case "delete":
      break;
    case "find":
      break;

    default:
      console.log("error, unsupported message");
  }

  sendResponse();
});

chrome.runtime.onInstalled.addListener((details) => {
  console.log('starting up');
});
