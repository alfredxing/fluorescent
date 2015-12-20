'use strict';

import Database from '../../app/core/Database.js';
import Annotation from '../../app/core/Annotation.js';

describe('fluorescent core', () => {

  describe('storage module', () => {

    // sample data
    let url = 'http://fluorescent.io/',
        position = '5:15:fake-serialization2',
        host = 'fluorescent.io',
        summary = 'quick summary',
        annotation = new Annotation(url, position, host, summary);

    let db = new Database();

    afterEach(() => db.clear());

    it('should be able to save an annotation', () => {
      let createPromise = db.create(annotation);
      return expect(createPromise).to.eventually.be.fulfilled;
    });

    describe('the result from querying for an annotation by url', () => {

      beforeEach(() => db.create(annotation));

      it('should be an Annotation object', () => {
        let result = db.findByUrl(url).then(result => result[0]);
        return expect(result).to.eventually.be.an.instanceof(Annotation);
      });

      it('should be identical to the Annotation object before it was saved', () => {
        let result = db.findByUrl(url).then(result => result[0]);
        return expect(result).to.eventually.deep.equal(annotation);
      });

    });

  });

});
