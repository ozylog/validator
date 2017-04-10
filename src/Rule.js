'use strict';

import validator from './validator';

type NObj = null | Object;

export default class Rule {
  name: string;
  value: any;
  message: string;
  validators: Array<any>;
  constructor(name: string, value: any, message: string = 'Invalid') {
    this.name = name;
    this.value = value;
    this.message = message;
    this.validators = [];
  }

  validate(): NObj {
    let result: NObj = null;
    const isValid = this.validators.every(({method, args}) => {
      return validator[method](this.value, ...args);
    });

    if (!isValid) {
      result = {
        name: this.name,
        message: this.message
      };
    }

    return result;
  }
}

const nonValidator = [
  'version',
  'blacklist',
  'escape',
  'unescape',
  'ltrim',
  'normalizeEmail',
  'rtrim',
  'stripLow',
  'toBoolean',
  'toDate',
  'toFloat',
  'toInt',
  'trim',
  'whitelist'
];

for (const method: string in validator) {
  if (nonValidator.includes(method)) continue;

  Rule.prototype[method] = function(...args: Array<any>): Rule {
    this.validators.push({
      method,
      args
    });

    return this;
  };
}
