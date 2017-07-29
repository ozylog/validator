'use strict';

import {Rules, Rule, addValidator} from './../dist/index.js';

describe('Feature: Rules Class', () => {
  context('Scenario: validate() passed', () => {
    describe(`Given Email: 'hello@world.com'`, () => {
      const email = 'hello@world.com';

      describe('And Rules: isRequired(), isEmail()', () => {
        const rules = new Rules();

        rules.addRule('email', email).isRequired().isEmail().setMessage('Email is invalid');

        it(`Then rules.validate() should return null`, () => {
          const errors = rules.validate();

          (errors === null).should.be.true();
        });

        it(`Then rules.validate({checkAll: true}) should return null`, () => {
          const errors = rules.validate({checkAll: true});

          (errors === null).should.be.true();
        });
      });
    });
  });

  context('Scenario: validate() not passed', () => {
    describe(`Given Name: ''`, () => {
      const name = '';

      describe('And Rules: isRequired()', () => {
        const rules = new Rules();

        rules.addRule('name', name).isRequired().setMessage('Name is required');

        it(`Then rules.validate() should return {name: 'Name is required'}`, () => {
          const errors = rules.validate();

          errors.should.be.eql({name: 'Name is required'});
        });

        it(`Then rules.validate({checkAll: true}) should return {name: ['Name is required']}`, () => {
          const errors = rules.validate({checkAll: true});

          errors.should.be.eql({name: ['Name is required']});
        });
      });
    });

    describe(`Given id: 'abc123'`, () => {
      const id = 'abc123';

      describe('And Rules: isMongoId(), isLength({min: 8})', () => {
        const rules = new Rules();

        const idRule = rules.addRule('id', id)

        idRule.isMongoId().setMessage('Invalid ID');
        idRule.isLength({min: 8}).setMessage('Min name length is 8');

        it(`Then rules.validate() should return {name: 'Invalid ID'}`, () => {
          const errors = rules.validate();

          errors.should.be.eql({id: 'Invalid ID'});
        });

        it(`Then rules.validate({checkAll: true}) should return {id: ['Invalid ID', 'Min name length is 8']}`, () => {
          const errors = rules.validate({checkAll: true});

          errors.should.be.eql({id: ['Invalid ID', 'Min name length is 8']});
        });
      });
    });
  });

  context('Scenario: validate() error', () => {
    describe('Given {isEmailAvailable: async func} to be added in addValidator()', () => {
      addValidator({
        isEmailAvailable: async(obj) => true
      });

      describe(`And email = 'hello@world.com' And rules isEmail() and isEmailAvailable()`, () => {
        const rules = new Rules();
        const email = 'hello@world.com';

        rules.addRule('email', email).isEmail().isEmailAvailable();

        it(`Then rules.validate() should return Error that ask to use validatorPromise`, () => {
          let error;

          try {
            const errors = rules.validate();
          } catch(err) {
            error = err;
          }

          error.should.be.instanceof.Error;
          (error.message.includes('Please use validatePromise() instead')).should.be.true();
        });
      });
    });
  });

  context('Scenario: validatePromise() passed', () => {
    before(() => {
      addValidator({
        isEmailAvailable: async(obj) => true
      });
    });

    describe(`Given Email: 'hello@world.com'`, () => {
      const email = 'hello@world.com';

      describe('And Rules: isRequired(), isEmail() and isEmailAvailable()', () => {
        const rules = new Rules();

        rules.addRule('email', email).isRequired().isEmail().isEmailAvailable().setMessage('Min name length is 8');

        it(`Then rules.validatePromise() should return null`, async () => {
          const errors = await rules.validatePromise();

          (errors === null).should.be.true();
        });

        it(`Then rules.validatePromise({checkAll: true}) should return null`, async () => {
          const errors = await rules.validatePromise({checkAll: true});

          (errors === null).should.be.true();
        });
      });
    });
  });

  context('Scenario: validatePromise() not passed', () => {
    before(() => {
      addValidator({
        isEmailAvailable: async(obj) => false
      });
    });

    describe(`Given Email: ''`, () => {
      const email = '';

      describe('And Rules: isRequired(), isEmail() and isEmailAvailable()', () => {
        const emailRule = new Rule('email', email);

        emailRule.isRequired().setMessage('Email is required');
        emailRule.isRequired().setMessage('Email is invalid');
        emailRule.isRequired().setMessage('Email is not available');

        const rules = new Rules(emailRule);

        it(`Then rules.validatePromise() should return {email: 'Email is required'}`, async () => {
          const errors = await rules.validatePromise();

          errors.should.be.eql({email: 'Email is required'});
        });

        it(`Then rules.validatePromise({checkAll: true})
            should return {email: ['Email is required', 'Email is invalid', 'Email is not available']}`, async () => {
          const errors = await rules.validatePromise({checkAll: true});

          errors.should.be.eql({email: ['Email is required', 'Email is invalid', 'Email is not available']});
        });
      });
    });
  });
});
