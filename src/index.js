let listeners = {};
let inBrowser = typeof window !== 'undefined';

try {
  let storage = window.localStorage;
  let x = '__storage_test__';

  storage.setItem(x, x);
  storage.removeItem(x);
} catch (e) {
  throw new Error('Local storage not supported by this browser');
}

function change (e) {
  if (!e) {
    e = window.event;
  }

  let all = listeners[e.key];

  if (all) {
    all.forEach(emit);
  }

  function emit (listener) {
    let item = JSON.parse(e.newValue);
    let oldItem = JSON.parse(e.oldValue);
    let val = typeof item === 'object' ? item.value : oldItem;
    let oldVal = oldItem && typeof oldItem === 'object' ? oldItem.value : oldItem;

    listener(val, oldVal, e.url || e.uri);
  }
}

export default class vueLocalStorage {
  constructor () {
    this.storage = window.localStorage;

    if (window.addEventListener) {
      window.addEventListener('storage', change, false);
    } else if (window.attachEvent) {
      window.attachEvent('onstorage', change);
    } else {
      window.onstorage = change;
    }

    Object.defineProperty(this, 'length', {
      get () {
        return this.storage.length;
      }
    });
  }

  install (Vue, options) {
    this.options = Object.assign({
      namespace: ''
    }, options || {});

    let _this = this;
    Vue.localStorage = _this;
    Object.defineProperty(Vue.prototype, '$localStorage', {
      get () {
        return _this;
      }
    });
  }

  set (name, value, expire = null) {
    this.storage.setItem(
      this.options.namespace + name,
      JSON.stringify({value: value, expire: expire !== null ? new Date().getTime() + expire : null})
    );
  }

  get (name, def = null) {
    let item = this.storage.getItem(this.options.namespace + name);

    if (item !== null) {
      let data = JSON.parse(item);

      if (data.expire === null) {
        return data.value;
      }

      if (data.expire >= new Date().getTime()) {
        return data.value;
      }

      this.remove(name);
    }

    return def;
  }

  key (index) {
    return this.storage.key(index);
  }

  remove (name) {
    return this.storage.removeItem(this.options.namespace + name);
  }

  clear () {
    if (this.length === 0) {
      return;
    }

    for (let i = 0; i < this.length; i++) {
      let key = this.storage.key(i);
      let regexp = new RegExp(`^${this.options.namespace}.+`, 'i');

      if (regexp.test(key) === false) {
        continue;
      }

      this.storage.removeItem(key);
    }
  }

  on (name, callback) {
    if (listeners[name]) {
      listeners[name].push(callback);
    } else {
      listeners[name] = [callback];
    }
  }

  off (name, callback) {
    let ns = listeners[name];

    if (ns.length > 1) {
      ns.splice(ns.indexOf(callback), 1);
    } else {
      listeners[name] = [];
    }
  }
}


if (typeof window !== 'undefined' && typeof window.Vue !== 'undefined') {
  window.Vue.use(new vueLocalStorage);
}
