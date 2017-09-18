import Memory from './memory';
import Storage from './storage';

const store = typeof window !== 'undefined' && 'localStorage' in window
  ? window.localStorage
  : Memory;
const ls = new Storage(store);

const VueLocalStorage = {
  /**
   * Install plugin
   *
   * @param {Object} Vue
   * @param {Object} options
   * @returns {Storage}
   */
  install(Vue, options) {
    ls.setOptions(Object.assign(ls.options, {
      namespace: '',
    }, options || {}));

    Vue.ls = ls; // eslint-disable-line
    Object.defineProperty(Vue.prototype, '$ls', {
      /**
       * Define $ls property
       *
       * @return {Storage}
       */
      get() {
        return ls;
      },
    });
  },
};

if (typeof window !== 'undefined') {
  window.VueLocalStorage = VueLocalStorage;
}

export default VueLocalStorage;
