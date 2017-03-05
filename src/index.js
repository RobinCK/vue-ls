import ls from './localStorage';

let VueLocalStorage = {
  install (Vue, options) {
    ls.options = Object.assign(ls.options, {
      namespace: ''
    }, options || {});

    Vue.ls = ls;
    Object.defineProperty(Vue.prototype, '$ls', {
      get () {
        return ls;
      }
    });
  }
};

if (typeof window !== 'undefined') {
  window.VueLocalStorage = VueLocalStorage;
}

export default VueLocalStorage;
