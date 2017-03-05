import test from 'ava';
import './helpers/setup-browser-env'
import Ls from '../src/index';
import Vue from 'vue';

const namespace = 'test__';

Vue.use(Ls, {
  namespace: namespace
});

test.beforeEach(() => {
  window.localStorage.clear();
});

test('Set item', t => {
  Vue.ls.set('set_item_test', 'val');

  t.is(JSON.parse(window.localStorage.getItem(`${namespace}set_item_test`)).value, 'val');
});

test('Get key by index', t => {
  Vue.ls.set('key_item_one_test', 'val_one');
  Vue.ls.set('key_item_two_test', 'val_two');

  t.is(Vue.ls.key(1), `${namespace}key_item_two_test`);
});

test('Get item', t => {
  window.localStorage.setItem(`${namespace}get_item_test`, JSON.stringify({value: 'val', expire: null}));

  t.is(Vue.ls.get('get_item_test'), 'val');
});

test('Get default value', t => {
  t.is(Vue.ls.get('undefined_item_test', 10), 10);
});

test('Expired item', t => {
  Vue.ls.set('expired_item_test', 'val', -1);

  t.is(Vue.ls.get('expired_item_test'), null);
});

test('Not expired item', t => {
  Vue.ls.set('expired_item_test', 'val', 1);

  t.is(Vue.ls.get('expired_item_test'), 'val');
});

test('Remove item', t => {
  window.localStorage.setItem(`${namespace}remove_item_test`, JSON.stringify({value: 'val', expire: null}));
  Vue.ls.remove('remove_item_test');

  t.is(window.localStorage.getItem(`${namespace}remove_item_test`), null);
});

test('Clear', t => {
  Vue.ls.set('item_test', 'val');
  Vue.ls.clear();

  t.is(Vue.ls.get('item_test'), null);
});

test('Empty clear', t => {
  Vue.ls.clear();
  t.is(Vue.ls.length, 0);
});

test('Clear namespace', t => {
  t.plan(2);

  Vue.ls.set('item_test', 'val');
  window.localStorage.setItem('item_test', JSON.stringify({value: 'val', expire: null}));

  Vue.ls.clear();

  t.is(Vue.ls.get('item_test'), null);
  t.is(JSON.parse(window.localStorage.getItem(`item_test`)).value, 'val');
});

test('Get length', t => {
  Vue.ls.set('item_one_test', 'val');
  Vue.ls.set('item_two_test', 'val');

  t.is(Vue.ls.length, 2);
});

test('Serialized data', t => {
  t.plan(5);

  Vue.ls.set('item_object', {foo: 'boo'});
  Vue.ls.set('item_array', [2, 3, 4, 5]);
  Vue.ls.set('item_number', 6);
  Vue.ls.set('item_string', '7');
  Vue.ls.set('item_boolean', false);

  t.deepEqual(Vue.ls.get('item_object'), {foo: 'boo'});
  t.deepEqual(Vue.ls.get('item_array'), [2, 3, 4, 5]);
  t.is(Vue.ls.get('item_number'), 6);
  t.is(Vue.ls.get('item_string'), '7');
  t.is(Vue.ls.get('item_boolean'), false);
});

//mock-browser not supported storage event
test('Add/Remove event', t => {
  Vue.ls.on('item_one_test', () => {});
  Vue.ls.on('item_two_test', () => {});
  Vue.ls.on('item_two_test', () => {});
  Vue.ls.off('item_two_test', () => {});
  Vue.ls.off('item_one_test', () => {});
});

test('Plugin context', t => {
  new Vue({
    created () {
      this.$ls.set('item_test', 'val');

      t.is(this.$ls.get('item_test'), 'val');
    }
  });
});
