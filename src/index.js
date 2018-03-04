import Memory from './memory';
import Storage from './storage';

/**
 * @type {{install: (function(Object, Object): Storage)}}
 */
const VueLocalStorage = {
  /**
   * Install plugin
   *
   * @param {Object} Vue
   * @param {Object} options
   * @returns {Storage}
   */
  install(Vue, options) {
    const _options = Object.assign({}, options, {
      storage: options.storage || 'local',
      name: options.name || 'ls',
    });

    if (_options.storage && ['memory', 'local', 'session'].indexOf(_options.storage) === -1) {
      throw new Error(`Vue-ls: Storage "${_options.storage}" is not supported`);
    }

    let store = null;

    switch(_options.storage) { // eslint-disable-line
      case 'local':
        store = typeof window !== 'undefined' && 'localStorage' in window
          ? window.localStorage
          : null
        ;
        break;

      case 'session':
        store = typeof window !== 'undefined' && 'sessionStorage' in window
          ? window.sessionStorage
          : null
        ;
        break;
      case 'memory': store = Memory;
        break;
    }

    if (!store) {
      store = Memory;
      console.error(`Vue-ls: Storage "${_options.storage}" is not supported your system, use memory storage`);
    }

    const ls = new Storage(store);

    ls.setOptions(Object.assign(ls.options, {
      namespace: '',
    }, _options || {}));

    Vue[_options.name] = ls; // eslint-disable-line
    Object.defineProperty(Vue.prototype, `$${_options.name}`, {
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
