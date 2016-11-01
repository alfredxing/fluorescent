'use strict';

import ChromePromise from 'chrome-promise';
import loadResources from './loadResources';
import utils from '../../../core/utils/utils';
import Fluorescent from '../../../core/Fluorescent';
loadResources();

const chromePromise = new ChromePromise();

let fl;

function init() {
  if (fl) { fl.darken(); }
  fl = new Fluorescent();

  return chromePromise.runtime.sendMessage({
    type: 'findByUrl',
    url: utils.getPageUrl(window)
  }).then(annotations => {
    fl.set(annotations);
    attachListeners(fl);
  });
}

init(); window.addEventListener('hashchange', init);

function handleAdd({ annotation }) {
  chromePromise.runtime.sendMessage({
    type: 'save',
    annotation
  }).then(id =>
    console.log('annotation saved with id: ' + id)
  );
}

function handleDelete({ id }) {
  chromePromise.runtime.sendMessage({
    type: 'delete',
    id
  }).then(() =>
    console.log('annotation deleted: ' + JSON.stringify(id))
  );
}

function handleEdit({ annotation }) {
  chromePromise.runtime.sendMessage({
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
  switch (message.type) {
    case 'illuminate':
      return fl.illuminate();
    case 'darken':
      return fl.darken();

    case 'uncap':
      return fl.uncap();
    case 'cap':
      return fl.cap();

    default:
      console.log('error, unsupported message');
  }
});
