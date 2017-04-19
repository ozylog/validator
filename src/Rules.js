// @flow

'use strict';

import Rule from './Rule';

type ObjNull = Object | null;

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

  validate(config: Object = {}): ObjNull {
    const {checkAll}: {checkAll: string} = config;
    const errors: Object = {};

    for (const rule: Rule of this.rules) {
      if (errors[rule.name] && !checkAll) continue;

      const error: ObjNull = rule.validate();

      if (error) {
        if (checkAll) {
          if (!errors[rule.name]) errors[rule.name] = [];

          errors[rule.name].push(error.message);
        } else {
          errors[rule.name] = error.message;
        }
      }
    }

    return Object.keys(errors).length ? errors : null;
  }

  async validatePromise(config: Object = {}): Promise<ObjNull> {
    const {checkAll}: {checkAll: boolean} = config;
    const errors: Object = {};

    for (const rule: Rule of this.rules) {
      if (errors[rule.name] && !checkAll) continue;

      const error: ObjNull = await rule.validatePromise();

      if (error) {
        if (checkAll) {
          if (!errors[rule.name]) errors[rule.name] = [];

          errors[rule.name].push(error.message);
        } else {
          errors[rule.name] = error.message;
        }
      }
    }

    return Object.keys(errors).length ? errors : null;
  }
}
