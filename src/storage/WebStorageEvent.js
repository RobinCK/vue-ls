const listeners = {};

/**
 * Event class
 */
export class WebStorageEvent {
  /**
   * Add storage change event
   *
   * @param {string} name
   * @param {Function} callback
   */
  static on(name, callback) {
    if (typeof listeners[name] === 'undefined') {
      listeners[name] = [];
    }

    listeners[name].push(callback);
  }

  /**
   * Remove storage change event
   *
   * @param {string} name
   * @param {Function} callback
   */
  static off(name, callback) {
    if (listeners[name].length) {
      listeners[name].splice(listeners[name].indexOf(callback), 1);
    } else {
      listeners[name] = [];
    }
  }

  /**
   * Emit event
   *
   * @param {Object} event
   */
  static emit(event) {
    const e = event || window.event;

    const getValue = (data) => {
      try {
        return JSON.parse(data).value;
      } catch (err) {
        return data;
      }
    };

    const fire = (listener) => {
      const newValue = getValue(e.newValue);
      const oldValue = getValue(e.oldValue);

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
