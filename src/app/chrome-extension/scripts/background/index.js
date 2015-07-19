'use strict';

module.exports = function() {
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    switch(message.type) {
      case "save":
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

  chrome.browserAction.onClicked.addListener(function(tab) {
    var message = {type: "test", url: tab.url};
    chrome.tabs.sendMessage(tab.id, message);
  });
}();

