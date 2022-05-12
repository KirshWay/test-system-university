import {defineStore} from 'pinia';

import Tests from '~/api/tests';
import {TestType} from '~/types/common';

export const usePassingTest = defineStore('usePassingTest', {
  state: () => ({
    test: {} as TestType,
    sessionUuid: '' as string,
  }),
  actions: {
    getTest(id: string) {
      Tests.getTest(id).then(({data}) => this.test = data);
    },
  },
});
