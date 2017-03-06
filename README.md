# vue-ls

Vue plugin for work with LocalStorage from Vue context

This plugin has been developed thanks to the inspiration of the [local-storage](https://www.npmjs.com/package/local-storage) package

[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/Flet/semistandard)
[![Build Status](https://img.shields.io/travis/RobinCK/vue-ls.svg)](https://travis-ci.org/RobinCK/vue-ls)
[![Coverage Status](https://coveralls.io/repos/github/RobinCK/vue-ls/badge.svg?branch=master)](https://coveralls.io/github/RobinCK/vue-ls?branch=master)


[![Code Climate](https://codeclimate.com/github/RobinCK/vue-ls/badges/gpa.svg)](https://codeclimate.com/github/RobinCK/vue-ls)
[![Dependencies](https://david-dm.org/robinck/vue-ls.svg)](https://david-dm.org/robinck/vue-ls)
[![devDependencies](https://david-dm.org/robinck/vue-ls/dev-status.svg)](https://david-dm.org/robinck/vue-ls#info=devDependencies&view=table)


[![Bower version](https://img.shields.io/bower/v/vue-ls.svg)]()
[![NPM version](https://img.shields.io/npm/v/vue-ls.svg)](https://www.npmjs.com/package/vue-ls)
[![npm](https://img.shields.io/npm/l/vue-ls.svg)](https://github.com/RobinCK/vue-ls/blob/master/LICENSE)


[![NPM](https://nodei.co/npm/vue-ls.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vue-ls/)

## Example

[Vue 1.x](https://jsfiddle.net/Robin_ck/Lvb2ah5p/)

[Vue 2.x](https://jsfiddle.net/Robin_ck/6x1akv1L/) 

## Install
#### CDN

Recommended: https://unpkg.com/vue-ls, which will reflect the latest version as soon as it is published to npm. You can also browse the source of the npm package at https://unpkg.com/vue-ls/

#### NPM

``` bash
npm install vue-ls --save
```

#### Yarn

``` bash
yarn add vue-ls
```

#### Bower

``` bash
bower install vue-ls --save
```

## Development Setup

``` bash
# install dependencies
npm install

# build dist files
npm run build
```

## Usage

Vue localStorage API.

``` js
import VueLocalStorage from 'vue-ls';

options = {
  namespace: 'vuejs__'
};

Vue.use(VueLocalStorage, options);

//or
//Vue.use(VueLocalStorage);

new Vue({
    el: '#app',
    mounted: function() {
        Vue.ls.set('foo', 'boo');
        //Set expire for item
        Vue.ls.set('foo', 'boo', 60 * 60 * 1000); //expiry 1 hour
        Vue.ls.get('foo');
        Vue.ls.get('boo', 10); //if not set boo returned default 10
        
        let callback = (val, oldVal, uri) => {
          console.log('localStorage chnage', val);
        } 
        
        Vue.ls.on('foo', callback) //watch change foo key and triggered callback
        Vue.ls.off('foo', callback) //unwatch
        
        Vue.ls.remove('foo');
    }
});
```

#### Global

- `Vue.ls`
 
#### Context
- `this.$ls`

## API

#### `Vue.ls.get(name, def)`

Returns value under `name` in local storage. Internally parses the value from JSON before returning it.

- `def`: default null, returned if not set `name`.

#### `Vue.ls.set(name, value, expire)`

Persists `value` under `name` in local storage. Internally converts the `value` to JSON.

- `expire`: default null, life time in milliseconds `name`

#### `Vue.ls.remove(name)`

Removes `name` from local storage. Returns `true` if the property was successfully deleted, and `false` otherwise.

#### `Vue.ls.clear()`

Clears local storage.

#### `Vue.ls.on(name, callback)`

Listen for changes persisted against `name` on other tabs. Triggers `callback` when a change occurs, passing the following arguments.

- `newValue`: the current value for `name` in local storage, parsed from the persisted JSON
- `oldValue`: the old value for `name` in local storage, parsed from the persisted JSON
- `url`: the url for the tab where the modification came from

#### `Vue.ls.off(name, callback)`

Removes a listener previously attached with `Vue.ls.on(name, callback)`.

## Note
Some browsers don't support the storage event, and most of the browsers that do support it will only call it when the storage is changed by a different window. So, open your page up in two windows. Click the links in one window and you will probably see the event in the other.

The assumption is that your page will already know all interactions with localStorage in its own window and only needs notification when a different window changes things. This, of course, is a foolish assumption. But.


## License
MIT © [Igor Ognichenko](https://github.com/RobinCK)
