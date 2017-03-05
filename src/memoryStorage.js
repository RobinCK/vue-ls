let ls = {};

const memoryStorage = {
  getItem (name) {
    return name in ls ? ls[name] : null;
  },

  setItem (name, value) {
    ls[name] = value;

    return true;
  },

  removeItem (name) {
    var found = name in ls;

    if (found) {
      return delete ls[name];
    }

    return false;
  },

  clear () {
    ls = {};

    return true;
  },

  key (index) {
    let keys = Object.keys(ls);

    return typeof keys[index] !== 'undefined' ? keys[index] : null;
  }
};

Object.defineProperty(memoryStorage, 'length', {
  get () {
    return Object.keys(ls).length;
  }
});

export default memoryStorage;
