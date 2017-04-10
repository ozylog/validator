'use strict';

import validator, {Rules} from './../dist/index.js';

describe('Check available functions', () => {
  it('validator.isEmpty should be available', () => {
    validator.isEmpty.should.be.ok();
  });

  it('validator.isRequired should be available', () => {
    validator.isRequired.should.be.ok();
  });

  it('Rules should be available', () => {
    Rules.should.be.ok();
  });
});
