'use strict';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case "illuminate":
      break;
    case "darken":
      break;

    case "uncap":
      break;
    case "cap":
      break;

    case "test":
      console.log(message.url);
      break;

    default:
      console.log("error, unsupported message");
  }
});
