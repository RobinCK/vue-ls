import ls from './localStorage';

const VueLocalStorage = {
  /**
   * Install plugin
   *
   * @param {Object} Vue
   * @param {Object} options
   * @returns {Storage}
   */
  install(Vue, options) {
    ls.options = Object.assign(ls.options, {
      namespace: '',
    }, options || {});

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
