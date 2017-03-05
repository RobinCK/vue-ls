import test from 'ava';
import Ls from '../src/index';
import Vue from 'vue';

const namespace = 'test__';

Vue.use(Ls, {
  namespace: namespace
});

test.beforeEach(() => {
  Vue.ls.storage.clear();
});

test('Set/Get item', t => {
  Vue.ls.set('set_item_test', 'val');

  t.is(Vue.ls.get('set_item_test'), 'val');
});

test('Remove item', t => {
  Vue.ls.set('remove_item_test', 'val');
  Vue.ls.remove('remove_item_test');

  t.is(Vue.ls.get('remove_item_test'), null);
});

test('Removing non-existent itset_item_testen', t => {
  t.is(Vue.ls.remove('remove_item_test'), false);
});

test('Get key by index', t => {
  t.plan(2);

  Vue.ls.set('key_item_one_test', 'val_one');
  Vue.ls.set('key_item_two_test', 'val_two');

  t.is(Vue.ls.key(1), `${namespace}key_item_two_test`);
  t.is(Vue.ls.key(100), null);
});

test('Clear', t => {
  Vue.ls.set('item_test', 'val');
  Vue.ls.clear();

  t.is(Vue.ls.get('item_test'), null);
});
