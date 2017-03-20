const eventListeners = {};

/**
 * Event callback
 *
 * @param {Object} e
 */
function change (e) {
  if (!e) {
    e = window.event;
  }

  if (typeof e === 'undefined' || typeof e.key === 'undefined') {
    return;
  }

  let all = eventListeners[e.key];

  if (typeof all !== 'undefined') {
    all.forEach(emit);
  }

  function emit (listener) {
    listener(e.newValue ? JSON.parse(e.newValue).value : e.newValue, e.oldValue ? JSON.parse(e.oldValue).value : e.oldValue, e.url || e.uri);
  }
}

/**
 * Storage Bridge
 */
class Storage {
  /**
   * @param {Object} storage
   * @param {Object} options
   */
  constructor (storage, options) {
    this.storage = storage;
    this.options = Object.assign({
      namespace: '',
      events: ['storage']
    }, options || {});

    Object.defineProperty(this, 'length', {
      get () {
        return this.storage.length;
      }
    });

    if (typeof window !== 'undefined') {
      for (let i in this.options.events) {
        if (window.addEventListener) {
          window.addEventListener(this.options.events[i], change, false);
        } else if (window.attachEvent) {
          window.attachEvent(`on${this.options.events[i]}`, change);
        } else {
          window[`on${this.options.events[i]}`] = change;
        }
      }
    }
  }

  /**
   * Set item
   *
   * @param {string} name
   * @param {*} value
   * @param {number} expire - seconds
   */
  set (name, value, expire = null) {
    this.storage.setItem(
      this.options.namespace + name,
      JSON.stringify({value: value, expire: expire !== null ? new Date().getTime() + expire : null})
    );
  }

  /**
   * Get item
   *
   * @param {string} name
   * @param {*} def - default value
   * @returns {*}
   */
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

  /**
   * Get item by key
   *
   * @param {number} index
   * @return {*}
   */
  key (index) {
    return this.storage.key(index);
  }

  /**
   * Remove item
   *
   * @param {string} name
   * @return {boolean}
   */
  remove (name) {
    return this.storage.removeItem(this.options.namespace + name);
  }

  /**
   * Clear storage
   */
  clear () {
    if (this.length === 0) {
      return;
    }

    let removedKeys = [];

    for (let i = 0; i < this.length; i++) {
      let key = this.storage.key(i);
      let regexp = new RegExp(`^${this.options.namespace}.+`, 'i');

      if (regexp.test(key) === false) {
        continue;
      }

      removedKeys.push(key);
    }

    for (let key in removedKeys) {
      this.storage.removeItem(removedKeys[key]);
    }
  }

  /**
   * Add storage change event
   *
   * @param {string} name
   * @param {Function} callback
   */
  on (name, callback) {
    if (eventListeners[this.options.namespace + name]) {
      eventListeners[this.options.namespace + name].push(callback);
    } else {
      eventListeners[this.options.namespace + name] = [callback];
    }
  }

  /**
   * Remove storage change event
   *
   * @param {string} name
   * @param {Function} callback
   */
  off (name, callback) {
    let ns = eventListeners[this.options.namespace + name];

    if (ns.length > 1) {
      ns.splice(ns.indexOf(callback), 1);
    } else {
      eventListeners[this.options.namespace + name] = [];
    }
  }
}

export {
  Storage,
  change,
  eventListeners
};
