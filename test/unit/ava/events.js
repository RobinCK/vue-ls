import Vue from 'vue';
import test from 'ava';

import './helpers/setupBrowserEnv'
import Ls from '../../../src/index';
import { WebStorageEvent } from '../../../src/storage';

Vue.use(Ls);

test.beforeEach(() => {
  window.localStorage.clear();
});

//mock-browser not supported storage event
test('Add/Remove event', (t) => {
  t.plan(4);

  Vue.ls.on('item_one_test', () => {});
  Vue.ls.on('item_two_test', () => {});
  Vue.ls.on('item_two_test', () => {});
  Vue.ls.on('item_three_test', (val, oldVal) => {
    t.is(val, 'val');
    t.is(oldVal, 'old_val');
  });
  Vue.ls.off('item_two_test', () => {});
  Vue.ls.off('item_one_test', () => {});
  Vue.ls.off('item_one_test', () => {});

  WebStorageEvent.emit({
    key: 'item_three_test',
    newValue: JSON.stringify({ value: 'val', expire: null }),
    oldValue: JSON.stringify({ value: 'old_val', expire: null }),
  });
  WebStorageEvent.emit({
    key: 'item_undefined_test',
    newValue: JSON.stringify({ value: 'val', expire: null }),
    oldValue: JSON.stringify({ value: 'old_val', expire: null }),
  });
  WebStorageEvent.emit({
    key: 'item_three_test',
    newValue: 'val',
    oldValue: 'old_val',
  });
  WebStorageEvent.emit();
});

