import Vue from 'vue';
import test from 'ava';

import './helpers/setupBrowserEnv'
import Ls from '../../../src/index';

const namespace = 'test__';

Vue.use(Ls, {
  namespace: namespace,
  storage: 'memory',
  name: 'memory'
});

test.beforeEach(() => {
  Vue.memory.storage.clear();
});

test('Set item', (t) => {
  Vue.memory.storage.clear(); // fix for ava-beta-8
  Vue.memory.set('set_item_test', 'val');

  t.is(JSON.parse(Vue.memory.storage.getItem(`${namespace}set_item_test`)).value, 'val');
});

test('Get key by index', (t) => {
  Vue.memory.storage.clear(); // fix for ava-beta-8
  Vue.memory.set('key_item_one_test', 'val_one');
  Vue.memory.set('key_item_two_test', 'val_two');

  t.is(Vue.memory.key(1), `${namespace}key_item_two_test`);
});

test('Get item', (t) => {
  Vue.memory.storage.clear(); // fix for ava-beta-8
  Vue.memory.storage.setItem(`${namespace}get_item_test`, JSON.stringify({value: 'val', expire: null}));

  t.is(Vue.memory.get('get_item_test'), 'val');
});

test('Get item try', (t) => {
  Vue.memory.storage.clear(); // fix for ava-beta-8
  Vue.memory.storage.setItem(`${namespace}get_item_test`, ';');

  t.is(Vue.memory.get('get_item_test', 1), 1);
});

test('Get default value', (t) => {
  Vue.memory.storage.clear(); // fix for ava-beta-8
  t.is(Vue.memory.get('undefined_item_test', 10), 10);
});

test('Expired item', (t) => {
  Vue.memory.storage.clear(); // fix for ava-beta-8
  Vue.memory.set('expired_item_test', 'val', -1);

  t.is(Vue.memory.get('expired_item_test'), null);
});

test('Not expired item', (t) => {
  Vue.memory.storage.clear(); // fix for ava-beta-8
  Vue.memory.set('expired_item_test', 'val', 1);

  t.is(Vue.memory.get('expired_item_test'), 'val');
});

test('Remove item', (t) => {
  Vue.memory.storage.clear(); // fix for ava-beta-8
  Vue.memory.storage.setItem(`${namespace}remove_item_test`, JSON.stringify({value: 'val', expire: null}));
  Vue.memory.remove('remove_item_test');

  t.is(Vue.memory.storage.getItem(`${namespace}remove_item_test`), null);
});

test('Clear', (t) => {
  Vue.memory.storage.clear(); // fix for ava-beta-8
  Vue.memory.set('item_test', 'val');
  Vue.memory.clear();

  t.is(Vue.memory.get('item_test'), null);
});

test('Empty clear', (t) => {
  Vue.memory.storage.clear(); // fix for ava-beta-8
  Vue.memory.clear();
  t.is(Vue.memory.length, 0);
});

test('Clear namespace', (t) => {
  Vue.memory.storage.clear(); // fix for ava-beta-8
  t.plan(2);

  Vue.memory.set('item_test', 'val');
  Vue.memory.storage.setItem('item_test', JSON.stringify({value: 'val', expire: null}));

  Vue.memory.clear();

  t.is(Vue.memory.get('item_test'), null);
  t.is(JSON.parse(Vue.memory.storage.getItem(`item_test`)).value, 'val');
});

test('Get length', (t) => {
  Vue.memory.storage.clear(); // fix for ava-beta-8
  Vue.memory.set('item_one_test', 'val');
  Vue.memory.set('item_two_test', 'val');

  t.is(Vue.memory.length, 2);
});

test('Serialized data', (t) => {
  Vue.memory.storage.clear(); // fix for ava-beta-8
  t.plan(5);

  Vue.memory.set('item_object', {foo: 'boo'});
  Vue.memory.set('item_array', [2, 3, 4, 5]);
  Vue.memory.set('item_number', 6);
  Vue.memory.set('item_string', '7');
  Vue.memory.set('item_boolean', false);

  t.deepEqual(Vue.memory.get('item_object'), {foo: 'boo'});
  t.deepEqual(Vue.memory.get('item_array'), [2, 3, 4, 5]);
  t.is(Vue.memory.get('item_number'), 6);
  t.is(Vue.memory.get('item_string'), '7');
  t.is(Vue.memory.get('item_boolean'), false);
});

test('Plugin context', (t) => {
  Vue.memory.storage.clear(); // fix for ava-beta-8
  new Vue({
    created () {
      this.$memory.set('item_test', 'val');

      t.is(this.$memory.get('item_test'), 'val');
    }
  });
});
