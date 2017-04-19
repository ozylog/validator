'use strict';

import {validator, addValidator, sanitizer, Rules} from './../dist/index.js';

describe('Check available functions', () => {
  it('validator.isEmpty should be available', () => {
    validator.isEmpty.should.be.ok();
  });

  it('validator.isRequired should be available', () => {
    validator.isRequired.should.be.ok();
  });

  it('addValidator should be available', () => {
    addValidator.should.be.ok();
  });

  it('sanitizer should be available', () => {
    sanitizer.should.be.ok();
  });

  it('Rules should be available', () => {
    Rules.should.be.ok();
  });
});
