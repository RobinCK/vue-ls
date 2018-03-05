# Getting Started {#getting-started}

Vue storage API.

```js
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
```

#### Usage global

Vue.ls

#### Usage context

this.$ls

