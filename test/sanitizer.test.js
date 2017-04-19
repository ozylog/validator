'use strict';

import {sanitizer} from './../dist/index.js';

describe('Feature: trim(param)', () => {
  const {trim} = sanitizer;

  context('Scenario: true', () => {
    describe(`Given ' test ' as param`, () => {
      const param = ' test ';

      it(`Then it should return 'test'`, () => {
        trim(param).should.be.equal('test');
      });
    });
  });
});
