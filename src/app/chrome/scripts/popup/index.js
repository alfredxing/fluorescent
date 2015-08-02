'use strict';

chrome.promise = new ChromePromise();

let uncapButton = document.getElementById('uncap');

uncapButton.addEventListener('click', () =>
  chrome.promise.tabs.query({
    currentWindow: true,
    active: true
  }).then(tabs =>
    chrome.tabs.sendMessage(tabs[0].id, { type: 'uncap' })
  )
);

let clearButton = document.getElementById('clear');

clearButton.addEventListener('click', () =>
  chrome.promise.runtime.sendMessage({ type: 'clear' }).then(() =>
    console.log('db cleared')
  )
);