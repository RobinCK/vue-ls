# vue-ls

Vue plugin for work with LocalStorage from Vue context

[![Dependencies](https://david-dm.org/robinck/vue-ls.svg)](https://david-dm.org/robinck/vue-ls)
[![devDependencies](https://david-dm.org/robinck/vue-ls/dev-status.svg)](https://david-dm.org/robinck/vue-ls#info=devDependencies&view=table)
[![NPM version](https://badge.fury.io/js/vue-ls.svg)](http://badge.fury.io/js/vue-ls)

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

Vue.use(new VueLocalStorage);

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
