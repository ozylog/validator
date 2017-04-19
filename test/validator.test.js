'use strict';

import {Rules, addValidator, validator} from './../dist/index.js';

describe('Feature: isRequired(param)', () => {
  const {isRequired} = validator;

  context('Scenario: true', () => {
    describe(`Given 'test' as param`, () => {
      const param = 'test';

      it('Then it should return true', () => {
        isRequired(param).should.be.true();
      });
    });
  });

  context('Scenario: false', () => {
    describe(`Given '' as param`, () => {
      const param = '';

      it('Then it should return false', () => {
        isRequired(param).should.be.false();
      });
    });
  });
});

describe('Feature: addValidator(param)', () => {
  context('Scenario: passed', () => {
    describe('Given {isObject: func} as param', () => {
      addValidator({
        isObject: (obj) => obj && obj.constructor.name === 'Object'
      });

      describe(`And user = {name: 'Udin'} And rules isObject()`, () => {
        const rules = new Rules();
        const user = {name: 'Udin'};

        rules.add('user', user).isObject();

        it(`Then rules.validate() should return null`, () => {
          const errors = rules.validate();

          (errors === null).should.be.true();
        });
      });
    });
  });

  context('Scenario: not passed', () => {
    describe('Given {isObject: func} as param', () => {
      addValidator({
        isObject: (obj) => obj && obj.constructor.name === 'Object'
      });

      describe(`And user = '' And rules isObject()`, () => {
        const rules = new Rules();
        const user = '';

        rules.add('user', user).isObject();

        it(`Then rules.validate() should return {user: 'Invalid'}`, () => {
          const errors = rules.validate();

          errors.should.be.eql({user: 'Invalid'});
        });
      });
    });
  });
});
