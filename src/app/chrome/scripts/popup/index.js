'use strict';

chrome.promise = new ChromePromise();

let button = document.getElementById('click-me');

button.addEventListener('click', () =>
  chrome.promise.tabs.query({
    currentWindow: true,
    active: true
  })
  .then(tabs => chrome.tabs.sendMessage(tabs[0].id, { type: 'uncap' }))
);
