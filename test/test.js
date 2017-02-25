import test from 'ava';
import Ls from '../dist/vue-ls';
import Vue from 'vue';

Vue.use(new Ls());

test.beforeEach(() => {
  window.localStorage.clear();
});

test('Set item', t => {
  Vue.ls.set('set_item_test', 'val');

  t.is(JSON.parse(window.localStorage.getItem('set_item_test')).value, 'val');
});

test('Get item', t => {
  window.localStorage.setItem('get_item_test', JSON.stringify({value: 'val', expire: null}));

  t.is(Vue.ls.get('get_item_test'), 'val');
});

test('Get default value', t => {
  t.is(Vue.ls.get('undefined_item_test', 10), 10);
});

test('Expired item', t => {
  Vue.ls.set('expired_item_test', 'val', -1);

  t.is(Vue.ls.get('expired_item_test'), null);
});

test('Remove item', t => {
  window.localStorage.setItem('remove_item_test', JSON.stringify({value: 'val', expire: null}));
  Vue.ls.remove('remove_item_test');

  t.is(window.localStorage.getItem('remove_item_test'), null);
});

test('Clear', t => {
  Vue.ls.set('item_test', 'val');
  Vue.ls.clear();

  t.is(Vue.ls.get('item_test'), null);
});

test('Get length', t => {
  Vue.ls.set('item_one_test', 'val');
  Vue.ls.set('item_two_test', 'val');

  t.is(Vue.ls.length, 2);
});

test('Serialized data', t => {
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
