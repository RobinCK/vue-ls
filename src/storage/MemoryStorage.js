let ls = {};

export class MemoryStorage {
  /**
   * Get item
   *
   * @param {string} name
   * @returns {*}
   */
  static getItem(name) {
    return name in ls ? ls[name] : null;
  }

  /**
   * Set item
   *
   * @param {string} name
   * @param {*} value
   * @returns {boolean}
   */
  static setItem(name, value) {
    ls[name] = value;

    return true;
  }

  /**
   * Remove item
   *
   * @param {string} name
   * @returns {boolean}
   */
  static removeItem(name) {
    const found = name in ls;

    if (found) {
      return delete ls[name];
    }

    return false;
  }

  /**
   * Clear storage
   *
   * @returns {boolean}
   */
  static clear() {
    ls = {};

    return true;
  }

  /**
   * Get item by key
   *
   * @param {number} index
   * @returns {*}
   */
  static key(index) {
    const keys = Object.keys(ls);

    return typeof keys[index] !== 'undefined' ? keys[index] : null;
  }

  /**
   * Define length property
   *
   * @return {number}
   */
  static get length() {
    return Object.keys(ls).length;
  }
}
