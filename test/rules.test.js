'use strict';

import {Rules} from './../dist/index.js';

describe('Feature: Rules Class', () => {
  context(`Given Name: ''`, () => {
    const name = '';

    context('And Rules: isRequired()', () => {
      const rules = new Rules();

      rules.add('name', name, 'Name is required').isRequired();

      const errors = rules.validate();

      it(`Then validating rules should return {name: ['Name is required']}`, () => {
        errors.should.be.eql({name: ['Name is required']});
      });
    });
  });

  context(`Given Name: 'Aloha'`, () => {
    const name = 'Aloha';

    context('And Rules: isRequired(), isLength({min: 8})', () => {
      const rules = new Rules();

      rules.add('name', name, 'Name is required').isRequired();
      rules.add('name', name, 'Min name length is 8').isLength({min: 8});

      const errors = rules.validate();

      it(`Then validating rules should return {name: ['Min name length is 8']}`, () => {
        errors.should.be.eql({name: ['Min name length is 8']});
      });
    });
  });

  context(`Given Email: 'hello@world.com'`, () => {
    const email = 'hello@world.com';

    context('And Rules: isRequired(), isEmail()', () => {
      const rules = new Rules();

      rules.add('email', email, 'email is invalid').isRequired().isEmail();

      const errors = rules.validate();

      it(`Then validating rules should return null`, () => {
        (errors === null).should.be.true();
      });
    });
  });
});
