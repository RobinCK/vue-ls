<p align="center">

  <img width="130" alt="vue-ls logo" src="https://cdn.rawgit.com/RobinCK/0ef39abfff9a44061cee5b2c072e892e/raw/e2b95a57825ac9b8e845609ff9fc5fdaae37b55a/logo.svg">
  
</p>

<p align="center">
  <a href="https://opencollective.com/vue-ls" alt="Financial Contributors on Open Collective"><img src="https://opencollective.com/vue-ls/all/badge.svg?label=financial+contributors" /></a>
  <a href="https://github.com/RobinCK/vue-ls"><img src="https://img.shields.io/badge/vuejs-1.x-brightgreen.svg?style=flat-square"></a>
  <a href="https://github.com/RobinCK/vue-ls"><img src="https://img.shields.io/badge/vuejs-2.x-brightgreen.svg?style=flat-square"></a>
  <a href="https://travis-ci.org/RobinCK/vue-ls"><img src="https://img.shields.io/travis/RobinCK/vue-ls.svg?style=flat-square"></a>
  <a href="https://coveralls.io/github/RobinCK/vue-ls?branch=master"><img src="https://img.shields.io/coveralls/RobinCK/vue-ls.svg?style=flat-square"></a>
  <a href="http://inch-ci.org/github/RobinCK/vue-ls"><img src="https://inch-ci.org/github/RobinCK/vue-ls.svg?branch=master&style=flat-squar"></a>
  <a href="https://houndci.com"><img src="https://img.shields.io/badge/Reviewed_by-Hound-8E64B0.svg"></a>
  
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/vue-ls"><img src="https://img.shields.io/npm/dm/vue-ls.svg?style=flat-square"></a>
  <a href="https://david-dm.org/robinck/vue-ls"><img src="https://img.shields.io/david/RobinCk/vue-ls.svg?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/vue-ls"><img src="https://img.shields.io/npm/v/vue-ls.svg?style=flat-square"></a>
  <a href="https://cdnjs.com/libraries/vue-ls"><img src="https://img.shields.io/cdnjs/v/vue-ls.svg"></a>
  <a href="https://github.com/RobinCK/vue-ls/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/vue-ls.svg?style=flat-square"></a>
 
</p>

<p align="center">
<img src="https://app.saucelabs.com/browser-matrix/Robin_ck.svg">

</p>

# vue-ls

[![Greenkeeper badge](https://badges.greenkeeper.io/RobinCK/vue-ls.svg)](https://greenkeeper.io/)

Vue plugin for work with local storage, session storage and memory storage from Vue context

[![NPM](https://nodei.co/npm/vue-ls.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vue-ls/)

## jsFiddle Example

[Vue 1.x](https://jsfiddle.net/Robin_ck/Lvb2ah5p/)

[Vue 2.x](https://jsfiddle.net/Robin_ck/6x1akv1L/) 

## Install
#### CDN

Recommended: https://unpkg.com/vue-ls, which will reflect the latest version as soon as it is published to npm. You can also browse the source of the npm package at https://unpkg.com/vue-ls/

Also available on <a href="https://cdn.jsdelivr.net/npm/vue-ls@latest">jsDelivr</a> or <a href="https://cdnjs.com/libraries/vue-ls">cdnjs<a/>, but these two services take some time to sync so the latest release may not be available yet.

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

Vue storage API.

``` js
import Storage from 'vue-ls';

options = {
  namespace: 'vuejs__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local', // storage name session, local, memory
};

Vue.use(Storage, options);

//or
//Vue.use(Storage);

new Vue({
    el: '#app',
    mounted: function() {
        Vue.ls.set('foo', 'boo');
        //Set expire for item
        Vue.ls.set('foo', 'boo', 60 * 60 * 1000); //expiry 1 hour
        Vue.ls.get('foo');
        Vue.ls.get('boo', 10); //if not set boo returned default 10
        
        let callback = (val, oldVal, uri) => {
          console.log('localStorage change', val);
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

Returns value under `name` in storage. Internally parses the value from JSON before returning it.

- `def`: default null, returned if not set `name`.

#### `Vue.ls.set(name, value, expire)`

Persists `value` under `name` in storage. Internally converts the `value` to JSON.

- `expire`: default null, life time in milliseconds `name`

#### `Vue.ls.remove(name)`

Removes `name` from storage. Returns `true` if the property was successfully deleted, and `false` otherwise.

#### `Vue.ls.clear()`

Clears storage.

#### `Vue.ls.on(name, callback)`

Listen for changes persisted against `name` on other tabs. Triggers `callback` when a change occurs, passing the following arguments.

- `newValue`: the current value for `name` in storage, parsed from the persisted JSON
- `oldValue`: the old value for `name` in storage, parsed from the persisted JSON
- `url`: the url for the tab where the modification came from

#### `Vue.ls.off(name, callback)`

Removes a listener previously attached with `Vue.ls.on(name, callback)`.

## Testing

- `npm run test` - run unit test
- `npm run test:browserstack` - run browser test
  - `npm run test:browserstack:chrome`
  - `npm run test:browserstack:ie`
  - `npm run test:browserstack:edge`
  - `npm run test:browserstack:firefox`
  - `npm run test:browserstack:safari`
- `npm run test:chrome` - run browser test in chrome

Testing Supported By<br>
<img width="200" src="https://cdn.rawgit.com/RobinCK/b1435c9cae05437ad9e4c2023aec08e4/raw/4b89e95cd89827935e6e3949d28a4f6ea3e48ee4/browser-stack.svg">

## Note
Some browsers don't support the storage event, and most of the browsers that do support it will only call it when the storage is changed by a different window. So, open your page up in two windows. Click the links in one window and you will probably see the event in the other.

The assumption is that your page will already know all interactions with localStorage in its own window and only needs notification when a different window changes things. This, of course, is a foolish assumption. But.

## Other my Vue JS plugins

| Project | Status | Description |
|---------|--------|-------------|
| [vue-gallery](https://github.com/RobinCK/vue-gallery)    | ![npm](https://img.shields.io/npm/v/vue-gallery.svg)  | VueJS responsive and customizable image and video gallery |
| [vue-popper](https://github.com/RobinCK/vue-popper)      | ![npm](https://img.shields.io/npm/v/vue-popperjs.svg) | VueJS popover component based on <a href="https://popper.js.org/">popper.js</a> |

## Contributors

### Code Contributors

This project exists thanks to all the people who contribute. [[Contribute](CONTRIBUTING.md)].
<a href="https://github.com/RobinCK/vue-ls/graphs/contributors"><img src="https://opencollective.com/vue-ls/contributors.svg?width=890&button=false" /></a>

### Financial Contributors

Become a financial contributor and help us sustain our community. [[Contribute](https://opencollective.com/vue-ls/contribute)]

#### Individuals

<a href="https://opencollective.com/vue-ls"><img src="https://opencollective.com/vue-ls/individuals.svg?width=890"></a>

#### Organizations

Support this project with your organization. Your logo will show up here with a link to your website. [[Contribute](https://opencollective.com/vue-ls/contribute)]

<a href="https://opencollective.com/vue-ls/organization/0/website"><img src="https://opencollective.com/vue-ls/organization/0/avatar.svg"></a>
<a href="https://opencollective.com/vue-ls/organization/1/website"><img src="https://opencollective.com/vue-ls/organization/1/avatar.svg"></a>
<a href="https://opencollective.com/vue-ls/organization/2/website"><img src="https://opencollective.com/vue-ls/organization/2/avatar.svg"></a>
<a href="https://opencollective.com/vue-ls/organization/3/website"><img src="https://opencollective.com/vue-ls/organization/3/avatar.svg"></a>
<a href="https://opencollective.com/vue-ls/organization/4/website"><img src="https://opencollective.com/vue-ls/organization/4/avatar.svg"></a>
<a href="https://opencollective.com/vue-ls/organization/5/website"><img src="https://opencollective.com/vue-ls/organization/5/avatar.svg"></a>
<a href="https://opencollective.com/vue-ls/organization/6/website"><img src="https://opencollective.com/vue-ls/organization/6/avatar.svg"></a>
<a href="https://opencollective.com/vue-ls/organization/7/website"><img src="https://opencollective.com/vue-ls/organization/7/avatar.svg"></a>
<a href="https://opencollective.com/vue-ls/organization/8/website"><img src="https://opencollective.com/vue-ls/organization/8/avatar.svg"></a>
<a href="https://opencollective.com/vue-ls/organization/9/website"><img src="https://opencollective.com/vue-ls/organization/9/avatar.svg"></a>

## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bhttps%3A%2F%2Fgithub.com%2FRobinCK%2Fvue-ls.svg?type=large)](https://app.fossa.io/projects/git%2Bhttps%3A%2F%2Fgithub.com%2FRobinCK%2Fvue-ls?ref=badge_large)

MIT © [Igor Ognichenko](https://github.com/RobinCK)
