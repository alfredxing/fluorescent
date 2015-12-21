'use strict';

import loadResources from './loadResources';
import utils from '../../../core/utils/utils';
import Fluorescent from '../../../core/Fluorescent';

loadResources();

chrome.promise = new ChromePromise();

let fl;

function init() {
  if (fl) { fl.darken(); }
  fl = new Fluorescent();

  return chrome.promise.runtime.sendMessage({
    type: 'findByUrl',
    url: utils.getPageUrl(window)
  }).then(annotations => {
    fl.set(annotations);
    attachListeners(fl);
  });
}

init(); window.addEventListener('hashchange', init);

function handleAdd({ annotation }) {
  chrome.promise.runtime.sendMessage({
    type: 'save',
    annotation
  }).then(id =>
    console.log('annotation saved with id: ' + id)
  );
}

function handleDelete({ id }) {
  console.log('annotation deleted: ' + JSON.stringify(id));
}

function handleEdit({ annotation }) {
  chrome.promise.runtime.sendMessage({
    type: 'save',
    annotation
  }).then(id =>
    console.log('annotation saved with id: ' + id)
  );
}

function attachListeners(fl) {
  fl.subscribe('add', handleAdd);
  fl.subscribe('delete', handleDelete);
  fl.subscribe('edit', handleEdit);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('message received: ' + message.type);

  switch (message.type) {
    case 'illuminate':
      fl.illuminate();
      break;
    case 'darken':
      fl.darken();
      break;

    case 'uncap':
      fl.uncap();
      break;
    case 'cap':
      fl.cap();
      break;

    default:
      console.log('error, unsupported message');
  }
});
