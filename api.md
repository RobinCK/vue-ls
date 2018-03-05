# API

#### `Vue.ls.get(name, def)`

Returns value under `name` in storage. Internally parses the value from JSON before returning it.

* `def`: default null, returned if not set `name`.

#### `Vue.ls.set(name, value, expire)`

Persists `value` under `name` in storage. Internally converts the `value` to JSON.

* `expire`: default null, life time in milliseconds `name`

#### `Vue.ls.remove(name)`

Removes `name` from storage. Returns `true` if the property was successfully deleted, and `false` otherwise.

#### `Vue.ls.clear()`

Clears storage.

#### `Vue.ls.on(name, callback)`

Listen for changes persisted against `name` on other tabs. Triggers `callback` when a change occurs, passing the following arguments.

* `newValue`: the current value for `name` in storage, parsed from the persisted JSON
* `oldValue`: the old value for `name` in storage, parsed from the persisted JSON
* `url`: the url for the tab where the modification came from

#### `Vue.ls.off(name, callback)`

Removes a listener previously attached with `Vue.ls.on(name, callback)`.

