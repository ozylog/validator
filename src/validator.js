// @flow

'use strict';

import validator from 'validator';

validator.isRequired = (param: any): boolean => {
  return param ? true : false;
};

export default validator;
