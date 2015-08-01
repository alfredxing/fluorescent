'use strict';

import chrome from 'sinon-chrome';
window.chrome = chrome;

require('../../app/chrome/scripts/background/index.js');

describe('chrome extension wrapper', () => {

  it('should runs tests', () => {
    expect(true).to.equal(true);
  });

  it('should listen for messages', () => {
    let sendResponse = sinon.spy();
    chrome.runtime.onMessage.trigger('unsupported', {}, sendResponse);

    expect(sendResponse).to.have.been.calledOnce;
  });

});
