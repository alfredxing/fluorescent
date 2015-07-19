'use strict';

module.exports = function() {
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    switch(message.type) {
      case "illuminate":
        break;
      case "darken":
        break;

      case "uncap":
        break;
      case "cap":
        break;

      case "test":
        console.log(message.url); break;

      default:
        console.log("error, unsupported message");
    }
  });
}();

