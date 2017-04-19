// @flow

'use strict';

import originValidator from 'validator';
import Rule from './Rule';
import {sanitizerMethods} from './sanitizer';

const validator: Object = Object.assign({}, originValidator);

export function addValidator(obj: Object): boolean {
  Object.assign(validator, obj);

  for (const method: string in obj) {
    Rule.addMethod(method);
  }

  return true;
}

validator.isRequired = (param: any): boolean => param ? true : false;

const nonValidator: Array<string> = [
  'version',
  ...sanitizerMethods
];

for (const method: string in validator) {
  if (nonValidator.includes(method)) {
    validator[method] = undefined;
    continue;
  }

  Rule.addMethod(method);
}

export default validator;
