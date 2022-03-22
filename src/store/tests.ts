import {defineStore} from 'pinia';
import {TestType} from '../types/test';

export const useTestStore = defineStore('tests', {
  state: () => ({
    tests: [] as TestType[],
  }),
});
