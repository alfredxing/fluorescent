'use strict';

var storage    = require('../../app/core/storage.js'),
    Annotation = require('../../app/core/annotation.js');

describe('fluorescent core', function() {

  describe('storage module', function() {

    // sample data
    var url = 'http://fluorescent.io/',
        position = '5:15:fake-serialization2',
        host = 'fluorescent.io',
        summary = 'quick summary',
        annotation = new Annotation(url, position, host, summary);

    before(storage.init);

    afterEach(storage.clear);

    it('should be able to save an annotation', function() {
      var createPromise = storage.create(annotation);
      return expect(createPromise).to.eventually.be.fulfilled;
    });

    describe('the result from querying for an annotation by url', function() {

      beforeEach(function() {
        return storage.create(annotation);
      });

      it('should be an Annotation object', function() {
        var result = storage.findByUrl(url).first();
        return expect(result).to.eventually.be.an.instanceof(Annotation);
      });

      it('should be identical to the Annotation object before it was saved', function() {
        var result = storage.findByUrl(url).first();
        return expect(result).to.eventually.deep.equal(annotation);
      });

    });

  });

});
