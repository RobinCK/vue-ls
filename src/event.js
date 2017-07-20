const listeners = {};

export default class {
  static on(name, callback) {
    if (typeof listeners[name] === 'undefined') {
      listeners[name] = [];
    }

    listeners[name].push(callback);
  }

  static off(name, callback) {
    if (listeners[name].length) {
      listeners[name].splice(listeners[name].indexOf(callback), 1);
    } else {
      listeners[name] = [];
    }
  }

  static emit(event) {
    const e = event || window.event;

    const fire = (listener) => {
      let newValue;
      let oldValue;

      try {
        newValue = JSON.parse(e.newValue).value;
      } catch (err) {
        newValue = e.newValue;
      }

      try {
        oldValue = JSON.parse(e.oldValue).value;
      } catch (err) {
        oldValue = e.oldValue;
      }

      listener(newValue, oldValue, e.url || e.uri);
    };

    if (typeof e === 'undefined' || typeof e.key === 'undefined') {
      return;
    }

    const all = listeners[e.key];

    if (typeof all !== 'undefined') {
      all.forEach(fire);
    }
  }
}
