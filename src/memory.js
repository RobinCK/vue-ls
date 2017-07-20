let ls = {};

const memoryStorage = {
  /**
   * Get item
   *
   * @param {string} name
   * @returns {*}
   */
  getItem(name) {
    return name in ls ? ls[name] : null;
  },

  /**
   * Set item
   *
   * @param {string} name
   * @param {*} value
   * @returns {boolean}
   */
  setItem(name, value) {
    ls[name] = value;

    return true;
  },

  /**
   * Remove item
   *
   * @param {string} name
   * @returns {boolean}
   */
  removeItem(name) {
    const found = name in ls;

    if (found) {
      return delete ls[name];
    }

    return false;
  },

  /**
   * Clear storage
   *
   * @returns {boolean}
   */
  clear() {
    ls = {};

    return true;
  },

  /**
   * Get item by key
   *
   * @param {number} index
   * @returns {*}
   */
  key(index) {
    const keys = Object.keys(ls);

    return typeof keys[index] !== 'undefined' ? keys[index] : null;
  },
};

Object.defineProperty(memoryStorage, 'length', {
  /**
   * Define length property
   *
   * @return {number}
   */
  get() {
    return Object.keys(ls).length;
  },
});

export default memoryStorage;
