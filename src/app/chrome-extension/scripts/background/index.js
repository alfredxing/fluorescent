'use strict';

var dexie = require('dexie');

chrome.runtime.onInstalled.addListener(function(details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

});