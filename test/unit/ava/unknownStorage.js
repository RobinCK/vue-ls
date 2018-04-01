import Vue from 'vue';
import test from 'ava';

import Ls from '../../../src/index';

test('Test exception storage', (t) => {
  try {
    Vue.use(Ls, {
      storage: 'unknown',
    });
  } catch(err) {
    t.is(err.message, 'Vue-ls: Storage "unknown" is not supported');
  }
});
