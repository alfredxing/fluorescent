'use strict';

import Storage from '../../../core/storage.js';

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

chrome.browserAction.onClicked.addListener((tab) => {
  let message = {type: "test", url: tab.url};
  chrome.tabs.sendMessage(tab.id, message);
});

chrome.runtime.onInstalled.addListener((details) => {
  console.log('starting up');
});
