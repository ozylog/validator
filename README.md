# @ozylog/validator
Validator and sanitizer

[![Travis](https://img.shields.io/travis/ozylog/validator.svg)](https://travis-ci.org/ozylog/validator) [![npm](https://img.shields.io/npm/dt/@ozylog/validator.svg)](https://www.npmjs.com/package/@ozylog/validator)

This validator is inspired by [express-validator](https://www.npmjs.com/package/express-validator) and using [validator](https://www.npmjs.com/package/validator) functions to validate.

## Installation
```
npm install @ozylog/validator --save
```

## Usage Examples

### Validator
Please check [validator](https://www.npmjs.com/package/validator) page to see list all available functions + `isRequired()`
```javascript
import validator from '@ozylog/validator';

validator.isEmpty(''); // returns true
validator.isRequired('') // returns false
```

### Rules
```javascript
import {Rules} from '@ozylog/validator';

const name = 'Aloha';
const rules = new Rules();
rules.add('name', name, 'Name is required').isRequired();
rules.add('name', name, 'Min name length is 8').isLength({min: 8});
const errors = rules.validate(); // return {name: ['Min name length is 8']}
```

```javascript
import {Rules} from '@ozylog/validator';

const email = 'hello@world.com';
const rules = new Rules();
rules.add('email', email, 'email is invalid').isRequired().isEmail();
const errors = rules.validate(); // return null
```

## License
MIT
