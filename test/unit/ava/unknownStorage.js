import test from 'ava';
import Ls from '../../../src/index';
import Vue from 'vue';

test('Test exception storage', (t) => {
  try {
    Vue.use(Ls, {
      storage: 'unknown',
    });
  } catch(err) {
    t.is(err.message, 'Vue-ls: Storage "unknown" is not supported');
  }
});
