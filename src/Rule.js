'use strict';

import 'babel-polyfill';
import validator from './validator';

type ObjNull = null | Object;

export default class Rule {
  name: string;
  value: any;
  message: string;
  validators: Array<any>;

  constructor(name: string, value: any, message: string = 'Invalid') {
    if (name.constructor !== String || value === undefined) throw new Error('Invalid param');

    this.name = name;
    this.value = value;
    this.message = message;
    this.validators = [];
  }

  validate(): ObjNull {
    let result: ObjNull = null;
    let isValid: boolean = true;

    for (const {method, args}: Object of this.validators) {
      isValid = validator[method](this.value, ...args);

      if (!isValid) break;

      if (isValid.constructor.name === 'Promise') {
        throw new Error(`Validator ${method}() returns Promise. Please use validatePromise() instead.`);
      }
    }

    if (!isValid) {
      result = {
        name: this.name,
        message: this.message
      };
    }

    return result;
  }

  async validatePromise(): Promise<ObjNull> {
    let result: ObjNull = null;
    let isValid: boolean = true;

    for (const {method, args}: Object of this.validators) {
      isValid = validator[method](this.value, ...args);

      if (isValid && isValid.constructor.name === 'Promise') {
        isValid = await isValid;
      }

      if (!isValid) break;
    }

    if (!isValid) {
      result = {
        name: this.name,
        message: this.message
      };
    }

    return result;
  }

  static addMethod(method: string): boolean {
    Rule.prototype[method] = function(...args: Array<any>): Rule {
      this.validators.push({
        method,
        args
      });

      return this;
    };

    return true;
  }
}
