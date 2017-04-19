// @flow

'use strict';

import validator from 'validator';

export const sanitizerMethods: Array<string> = [
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

const sanitizer: Object = {};

for (const method: string of sanitizerMethods) {
  if (validator[method]) {
    sanitizer[method] = validator[method];
  }
}

export default sanitizer;
