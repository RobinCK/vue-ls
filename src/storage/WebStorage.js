import { WebStorageEvent } from './WebStorageEvent';

/**
 * Storage Bridge
 */
export class WebStorage {
  /**
   * @param {Object} storage
   */
  constructor(storage) {
    this.storage = storage;
    this.options = {
      namespace: '',
      events: ['storage'],
    };

    Object.defineProperty(this, 'length', {
      /**
       * Define length property
       *
       * @return {number}
       */
      get() {
        return this.storage.length;
      },
    });

    if (typeof window !== 'undefined') {
      for (const i in this.options.events) {
        if (window.addEventListener) {
          window.addEventListener(this.options.events[i], WebStorageEvent.emit, false);
        } else if (window.attachEvent) {
          window.attachEvent(`on${this.options.events[i]}`, WebStorageEvent.emit);
        } else {
          window[`on${this.options.events[i]}`] = WebStorageEvent.emit;
        }
      }
    }
  }

  /**
   * Set Options
   *
   * @param {Object} options
   */
  setOptions(options = {}) {
    this.options = Object.assign(this.options, options);
  }

  /**
   * Set item
   *
   * @param {string} name
   * @param {*} value
   * @param {number} expire - seconds
   */
  set(name, value, expire = null) {
    const stringifyValue = JSON.stringify({
      value,
      expire: expire !== null ? new Date().getTime() + expire : null,
    });

    this.storage.setItem(this.options.namespace + name, stringifyValue);
  }

  /**
   * Get item
   *
   * @param {string} name
   * @param {*} def - default value
   * @returns {*}
   */
  get(name, def = null) {
    const item = this.storage.getItem(this.options.namespace + name);

    if (item !== null) {
      try {
        const data = JSON.parse(item);

        if (data.expire === null) {
          return data.value;
        }

        if (data.expire >= new Date().getTime()) {
          return data.value;
        }

        this.remove(name);
      } catch (err) {
        return def;
      }
    }

    return def;
  }

  /**
   * Get item by key
   *
   * @param {number} index
   * @return {*}
   */
  key(index) {
    return this.storage.key(index);
  }

  /**
   * Remove item
   *
   * @param {string} name
   * @return {boolean}
   */
  remove(name) {
    return this.storage.removeItem(this.options.namespace + name);
  }

  /**
   * Clear storage
   */
  clear() {
    if (this.length === 0) {
      return;
    }

    const removedKeys = [];

    for (let i = 0; i < this.length; i++) {
      const key = this.storage.key(i);
      const regexp = new RegExp(`^${this.options.namespace}.+`, 'i');

      if (regexp.test(key) === false) {
        continue;
      }

      removedKeys.push(key);
    }

    for (const key in removedKeys) {
      this.storage.removeItem(removedKeys[key]);
    }
  }

  /**
   * Add storage change event
   *
   * @param {string} name
   * @param {Function} callback
   */
  on(name, callback) {
    WebStorageEvent.on(this.options.namespace + name, callback);
  }

  /**
   * Remove storage change event
   *
   * @param {string} name
   * @param {Function} callback
   */
  off(name, callback) {
    WebStorageEvent.off(this.options.namespace + name, callback);
  }
}
