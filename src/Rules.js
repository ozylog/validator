// @flow

'use strict';

import Rule from './Rule';

type NObj = null | Object;

export default class Rules {
  rules: Array<Rule>;

  constructor() {
    this.rules = [];
  }

  add(name: string, value: any, message: string): Rule {
    const rule: Rule = new Rule(name, value, message);

    this.rules.push(rule);

    return rule;
  }

  validate(): NObj {
    let result: NObj = null;
    const arrErrors: Array<Object> = [];

    for (const rule: Rule of this.rules) {
      const error: NObj = rule.validate();

      if (error) arrErrors.push(error);
    }

    if (arrErrors.length) {
      result = {};

      for (const error: Object of arrErrors) {
        if (!result[error.name]) result[error.name] = [];

        result[error.name].push(error.message);
      }
    }

    return result;
  }
}
