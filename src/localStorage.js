import memoryStorage from './memoryStorage';
import {Storage} from './storage';

const store = typeof window !== 'undefined' && 'localStorage' in window
  ? window.localStorage
  : memoryStorage
;
const storageObject = new Storage(store);

export default storageObject;
