'use strict';

import 'babel-polyfill';
import validator from './validator';

type ObjNull = null | Object;

const DEFAULT_MESSAGE = 'Invalid';

export default class Rule {
  name: string;
  value: any;
  message: string;
  validators: Object;

  constructor(name: string, value: any): Rule {
    if (name.constructor !== String || value === undefined) throw new Error('Invalid param');

    this.name = name;
    this.value = value;
    this.validators = {};

    return this;
  }

  setMessage(message: string): Rule {
    this.validators[message] = this.validators[DEFAULT_MESSAGE];

    delete this.validators[DEFAULT_MESSAGE];
    return this;
  }

  validate(config: Object = {}): ObjNull {
    const {checkAll}: {checkAll: ?boolean} = config;
    let result: ObjNull = null;

    for (const message: string in this.validators) {
      let isValid: boolean = true;

      for (const {method, args}: {method: string, args: Array<any>} of this.validators[message]) {
        isValid = validator[method](this.value, ...args);

        if (isValid.constructor && isValid.constructor.name === 'Promise') {
          throw new Error(`Validator ${method}() returns Promise. Please use validatePromise() instead.`);
        }

        if (!isValid) break;
      }

      if (!isValid) {
        if (checkAll) {
          if (!result) {
            result = {[this.name]: []};
          }

          result[this.name].push(message);
        } else {
          result = {[this.name]: message};
          break;
        }
      }
    }

    return result;
  }

  async validatePromise(config: Object = {}): Promise<ObjNull> {
    const {checkAll}: {checkAll: ?boolean} = config;
    let result: ObjNull = null;

    for (const message: string in this.validators) {
      let isValid: boolean = true;

      for (const {method, args}: {method: string, args: Array<any>} of this.validators[message]) {
        const validatorResult: boolean | Promise<boolean> = validator[method](this.value, ...args);

        if (validatorResult.constructor.name === 'Promise') {
          isValid = await validatorResult;
        } else {
          isValid = validatorResult;
        }

        if (!isValid) break;
      }

      if (!isValid) {
        if (checkAll) {
          if (!result) {
            result = {[this.name]: []};
          }

          result[this.name].push(message);
        } else {
          result = {[this.name]: message};
          break;
        }
      }
    }

    return result;
  }

  static addMethod(method: string): boolean {
    Rule.prototype[method] = function(...args: Array<any>): Rule {
      if (!this.validators[DEFAULT_MESSAGE]) this.validators[DEFAULT_MESSAGE] = [];
      this.validators[DEFAULT_MESSAGE].push({
        method,
        args
      });

      return this;
    };

    return true;
  }
}
