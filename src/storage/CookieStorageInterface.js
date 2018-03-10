const $cookie = {
  get: () => document.cookie,
  set: (value) => {
    document.cookie = value;
  },
  data: {}, // metadata associated to the cookies
};

export class CookieStorageInterface {
  /**
   * Get item
   *
   * @param {string} name
   * @returns {*}
   */
  static getItem(name) {
  }

  /**
   * Set item
   *
   * @param {string} name
   * @param {*} value
   * @returns {boolean}
   */
  static setItem(name, value) {
  }

  /**
   * Remove item
   *
   * @param {string} name
   * @returns {boolean}
   */
  static removeItem(name) {
  }

  /**
   * Clear storage
   *
   * @returns {boolean}
   */
  static clear() {
  }

  /**
   * Get item by key
   *
   * @param {number} index
   * @returns {*}
   */
  static key(index) {
  }

  /**
   * Define length property
   *
   * @return {number}
   */
  static get length() {
  }
}
