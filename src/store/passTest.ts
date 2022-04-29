import {defineStore} from 'pinia';

import PassTests from '~/api/passTest';
import Tests from '~/api/tests';
import {TestType} from '~/types/common';

export const usePassTest = defineStore('usePassTest', {
  state: () => ({
    test: {} as TestType,
    sessionUuid: '' as string,
  }),
  actions: {
    getPassTest(id: string) {
      Tests.getTest(id).then(({data}) => this.test = data);
    },

    startTestingSession(id: string) {
      PassTests.startTestingSession(id).then(({data}) => this.sessionUuid = data.session_uuid);
    },
  },
  getters: {currentQuestion(state) {}},
});
