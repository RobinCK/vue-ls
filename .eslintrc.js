module.exports = {
  "root": true,
  "parser": 'babel-eslint',
  "parserOptions": {
    "sourceType": 'module'
  },
  "env": {
    "browser": true
  },
  "extends": 'airbnb-base',
  "plugins": [],
  "globals": {
    "window": true
  },
  "rules": {
    "no-cond-assign": 0,
    "no-plusplus": 0,
    "no-restricted-syntax": 0,
    "global-require": 0,
    "no-continue": 0,
    "no-multi-assign": 0,
    "no-empty": 0,
    "guard-for-in": 0,
    "camelcase": 0,
    "consistent-return": 0,
    "no-confusing-arrow": 0,
    "no-extra-boolean-cast": 0,
    "no-lonely-if": 0,
    "no-underscore-dangle": 0,
    'import/extensions': ['error', 'always', {
      "js": "never"
    }]
  }
};
