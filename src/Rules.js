// @flow

'use strict';

import Rule from './Rule';

export default class Rules {
  list: Array<Rule>;

  constructor() {
    this.list = [];
  }

  add(name: string, message: string): Rule {
    const rule: Rule = new Rule(name, message);

    this.list.push(rule);

    return rule;
  }
}
