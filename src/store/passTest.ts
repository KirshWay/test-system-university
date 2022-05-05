import {defineStore} from 'pinia';

import PassTests from '~/api/passTest';
import Tests from '~/api/tests';
import {TestType} from '~/types/common';

export const usePassTest = defineStore('usePassTest', {
  state: () => ({
    test: {} as TestType,
    sessionUuid: '' as string,
    currentQuestion: 0,
  }),
  actions: {
    getPassTest(id: string) {
      Tests.getTest(id).then(({data}) => this.test = data);
    },

    startTestingSession(id: string) {
      PassTests.startTestingSession(id).then(({data}) => this.sessionUuid = data.session_uuid);
    },

    nextQuestion() {
      this.test.questions.forEach((el, index) => index + 1);
    },
  },
  getters: {
    getCurrentQuestion(state) {
      return state.test.questions[0];
    },
  },
});
