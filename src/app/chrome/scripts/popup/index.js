'use strict';

import ChromePromise from 'chrome-promise';
const chromePromise = new ChromePromise();

function sendToActiveTab(message) {
  chromePromise.tabs.query({
    currentWindow: true,
    active: true
  }).then(tabs =>
    chrome.tabs.sendMessage(tabs[0].id, message)
  );
}

let uncapButton = document.getElementById('uncap'),
    hideButton = document.getElementById('hide'),
    showButton = document.getElementById('show');

uncapButton.addEventListener('click', () =>
  sendToActiveTab({ type: 'uncap' })
);

hideButton.addEventListener('click', () =>
  sendToActiveTab({ type: 'darken' })
);

showButton.addEventListener('click', () =>
  sendToActiveTab({ type: 'illuminate' })
);
