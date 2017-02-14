# vue-ls

Vue plugin for work with LocalStorage from Vue context
This plugin has been developed thanks to the inspiration of the [local-storage](https://www.npmjs.com/package/local-storage) package

[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/Flet/semistandard)
[![Build Status](https://img.shields.io/travis/RobinCK/vue-ls.svg)](https://travis-ci.org/RobinCK/vue-ls)
[![Dependencies](https://david-dm.org/robinck/vue-ls.svg)](https://david-dm.org/robinck/vue-ls)
[![devDependencies](https://david-dm.org/robinck/vue-ls/dev-status.svg)](https://david-dm.org/robinck/vue-ls#info=devDependencies&view=table)
[![Bower version](https://img.shields.io/bower/v/vue-ls.svg)]()
[![NPM version](https://img.shields.io/npm/v/vue-ls.svg)](https://www.npmjs.com/package/vue-ls)
[![npm](https://img.shields.io/npm/l/vue-ls.svg)](https://github.com/RobinCK/vue-ls/blob/master/LICENSE)


[![NPM](https://nodei.co/npm/vue-ls.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vue-ls/)

## Install
``` bash
npm install vue-ls --save
```
or
``` bash
yarn install vue-ls
```

### Development Setup

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

Vue.use(new VueLocalStorage, options);

//or
//Vue.use(new VueLocalStorage);

new Vue({
    el: '#app',
    mounted: function() {
        this.$localStorage.set('foo', 'boo');
        //Set expire for item
        this.$localStorage.set('foo', 'boo', 60 * 60 * 1000); //expiry 1 hour
        this.$localStorage.get('foo');
        this.$localStorage.get('boo', 10); //if not set boo returned default 10
        
        let callback = (val, oldVal, uri) => {
          console.log('localStorage chnage', val);
        } 
        
        this.$localStorage.on('foo', callback) //watch change foo key and triggered callback
        this.$localStorage.off('foo', callback) //unwatch
        
        this.$localStorage.remove('foo');
    }
});
```

## API

#### `this.$localStorage.get(name, def)`

Returns value under `name` in local storage. Internally parses the value from JSON before returning it.

- `def`: default null, returned if not set `name`.

#### `this.$localStorage.set(name, value, expire)`

Persists `value` under `name` in local storage. Internally converts the `value` to JSON.

- `expire`: default null, life time in milliseconds `name`

#### `this.$localStorage.remove(name)`

Removes `name` from local storage. Returns `true` if the property was successfully deleted, and `false` otherwise.

#### `this.$localStorage.clear()`

Clears local storage.

#### `this.$localStorage.on(name, callback)`

Listen for changes persisted against `name` on other tabs. Triggers `callback` when a change occurs, passing the following arguments.

- `newValue`: the current value for `name` in local storage, parsed from the persisted JSON
- `oldValue`: the old value for `name` in local storage, parsed from the persisted JSON
- `url`: the url for the tab where the modification came from

#### `this.$localStorage.off(name, callback)`

Removes a listener previously attached with `this.$localStorage.on(name, callback)`.

## Note
Some browsers don't support the storage event, and most of the browsers that do support it will only call it when the storage is changed by a different window. So, open your page up in two windows. Click the links in one window and you will probably see the event in the other.

The assumption is that your page will already know all interactions with localStorage in its own window and only needs notification when a different window changes things. This, of course, is a foolish assumption. But.


## License
MIT © [Igor Ognichenko](https://github.com/RobinCK)
