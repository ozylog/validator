# @ozylog/validator
Validator and sanitizer

[![Travis](https://img.shields.io/travis/ozylog/validator.svg)](https://travis-ci.org/ozylog/validator) [![npm](https://img.shields.io/npm/dt/@ozylog/validator.svg)](https://www.npmjs.com/package/@ozylog/validator)

This validator is inspired by [express-validator](https://www.npmjs.com/package/express-validator) and using [validator](https://www.npmjs.com/package/validator) functions to validate.

## Installation
```
npm install @ozylog/validator --save
```

## Usage Examples

### validator
Please check [validator](https://www.npmjs.com/package/validator) page to see list all available functions + `isRequired()`
```javascript
import {validator} from '@ozylog/validator';

validator.isEmpty(''); // returns true
validator.isRequired('') // returns false
```
### addValidator
```javascript
import {addValidator} from '@ozylog/validator';

addValidator({
    isEmailAvailable: async () => true
});
```

### sanitizer
```javascript
import {sanitizer} from '@ozylog/validator'

sanitizer.trim(' test '); // returns 'test'
```

### Rules
```javascript
import {Rules, Rule} from '@ozylog/validator';

const name = '';
const email = 'hello@world.com';
const nameRule = new Rule('name', name);
const emailRule = new Rule('email', email);

nameRule.isRequired().setMessage('Name is required');
nameRule.isLength({min: 8}).setMessage('Min name length is 8');

emailRule.isEmail().setMesssage('Invalid email');

const rules = new Rules(nameRule, emailRule);

rules.add('name', name, 'Name is required').isRequired();
rules.add('name', name, 'Min name length is 8').isLength({min: 8});
rules.validate(); // returns {name: 'Name is required'}
rules.validate({checkAll: true}); // returns {name: ['Name is required', 'Min name length is 8']}
```

```javascript
import {addValidator, Rules} from '@ozylog/validator';

addValidator({
    isEmailAvailable: async () => false
});

const email = 'hello@world.com';
const rules = new Rules();
rules.addRule('email', email).isEmailAvailable().setMessage('Email is not available');

await rules.validatePromise(); // returns {email: 'Email is not available'}
await rules.validatePromise({checkAll: true}); // returns {email: ['Email is not available']}
```

```javascript
import {Rules, Rule} from '@ozylog/validator';

const email = 'hello@world.com';
const rules = new Rules();
const emailRule = new Rule('email', email).isRequired().isEmail();
rules.addRules(emailRule);
const errors = rules.validate(); // returns null
```

## License
MIT
