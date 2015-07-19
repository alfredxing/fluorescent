'use strict';

var chrome = require('sinon-chrome');
window.chrome = chrome;

require('../../app/chrome-extension/scripts/background/index.js');

describe('chrome extension', function() {

  it('should runs tests', function() {
    expect(true).to.equal(true);
  });

  it('should listen for messages', function() {
    var sendResponse = sinon.spy();
    chrome.runtime.onMessage.trigger('unsupported', {}, sendResponse);

    sinon.assert.calledOnce(sendResponse);
  });

});