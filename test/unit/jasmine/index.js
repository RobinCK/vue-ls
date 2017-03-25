import Ls from '../../../src/index';
import Vue from 'vue';

const namespace = 'test__';

Vue.use(Ls, {
  namespace: namespace
});

describe("Plugin test", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("Set item", () => {
    Vue.ls.set('set_item_test', 'val');

    expect(JSON.parse(window.localStorage.getItem(`${namespace}set_item_test`)).value).toBe('val');
  });

  it('Get item', () => {
    window.localStorage.setItem(`${namespace}get_item_test`, JSON.stringify({value: 'val', expire: null}));

    expect(Vue.ls.get('get_item_test')).toBe('val');
  });

  it('Get default value', () => {
    expect(Vue.ls.get('undefined_item_test', 10)).toBe(10);
  });

  it('Expired item', () => {
    Vue.ls.set('expired_item_test', 'val', -1);

    expect(Vue.ls.get('expired_item_test')).toBe(null);
  });

  it('Not expired item', () => {
    Vue.ls.set('expired_item_test', 'val', 1);

    expect(Vue.ls.get('expired_item_test')).toBe('val');
  });

  it('Remove item', () => {
    window.localStorage.setItem(`${namespace}remove_item_test`, JSON.stringify({value: 'val', expire: null}));
    Vue.ls.remove('remove_item_test');

    expect(window.localStorage.getItem(`${namespace}remove_item_test`)).toBe(null);
  });


  it('Clear', () => {
    Vue.ls.set('item_test', 'val');
    Vue.ls.clear();

    expect(Vue.ls.get('item_test')).toBe(null);
  });

  it('Empty clear', () => {
    Vue.ls.clear();
    expect(Vue.ls.length).toBe(0);
  });

  it('Clear namespace', () => {
    Vue.ls.set('item_test', 'val');
    window.localStorage.setItem('item_test', JSON.stringify({value: 'val', expire: null}));

    Vue.ls.clear();

    expect(Vue.ls.get('item_test')).toBe(null);
    expect(JSON.parse(window.localStorage.getItem(`item_test`)).value).toBe('val');
  });

  it('Get length', () => {
    Vue.ls.set('item_one_test', 'val');
    Vue.ls.set('item_two_test', 'val');

    expect(Vue.ls.length).toBe(2);
  });

  it('Serialized data', () => {
    Vue.ls.set('item_object', {foo: 'boo'});
    Vue.ls.set('item_array', [2, 3, 4, 5]);
    Vue.ls.set('item_number', 6);
    Vue.ls.set('item_string', '7');
    Vue.ls.set('item_boolean', false);

    expect(Vue.ls.get('item_object')).toEqual({foo: 'boo'});
    expect(Vue.ls.get('item_array')).toEqual([2, 3, 4, 5]);
    expect(Vue.ls.get('item_number')).toEqual(6);
    expect(Vue.ls.get('item_string')).toEqual('7');
    expect(Vue.ls.get('item_boolean')).toEqual(false);
  });
});
