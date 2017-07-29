// @flow

'use strict';

import Rule from './Rule';

type ObjNull = Object | null;

export default class Rules {
  list: Array<Rule>;

  constructor(...listOfRule: Array<?Rule>): Rules {
    this.list = [];

    if (listOfRule.length) {
      for (const rule: Rule of listOfRule) {
        if (rule.constructor.name === 'Rule') this.list.push(rule);
      }
    }

    return this;
  }

  addRule(name: string, value: any): Rule {
    const rule: Rule = new Rule(name, value);

    this.list.push(rule);

    return rule;
  }

  addRules(...listOfRule: Array<?Rule>) {
    const isValid: boolean = listOfRule.every((rule: any): boolean => rule.contrustor === Rule);

    if (isValid) this.list.concat(listOfRule);

    return;
  }

  validate(config: Object = {}): ObjNull {
    const {checkAll}: {checkAll: ?boolean} = config;
    const errors: Object = {};

    for (const rule: Rule of this.list) {
      const error: ObjNull = rule.validate({checkAll: checkAll || false});

      if (error) Object.assign(errors, error);
    }

    return Object.keys(errors).length ? errors : null;
  }

  async validatePromise(config: Object = {}): Promise<ObjNull> {
    const {checkAll}: {checkAll: ?boolean} = config;
    const errors: Object = {};

    for (const rule: Rule of this.list) {
      const error: ObjNull = await rule.validatePromise({checkAll: checkAll || false});

      if (error) Object.assign(errors, error);
    }

    return Object.keys(errors).length ? errors : null;
  }
}
