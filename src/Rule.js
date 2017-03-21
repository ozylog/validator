'use strict';

import validator from 'validator';

export default class Rule {
  r: Object;
  constructor(name: string, message: string) {
    this.r = {
      name,
      message,
      validators: []
    };

    Object.keys(validator).forEach((methodName: string) => {
      this[methodName] = (...args: Array<any>): Rule => {
        this.r.validators.push({
          validator: validator[methodName],
          args
        });

        return this;
      };
    });
  }
}
