let ls = {};

export default {
  getItem (name) {
    return name in ls ? ls[name] : null;
  },

  setItem (name, value) {
    ls[name] = value;

    return true;
  },

  removeItem (name) {
    var found = key in ls;

    if (found) {
      return delete ls[name];
    }

    return false;
  },

  clear () {
    ls = {};

    return true;
  }
};
