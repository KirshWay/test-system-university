import {defineStore} from 'pinia';

import PassingTest from '~/api/passingTest';
import {Question, Test} from '~/types/test';

export const usePassingTest = defineStore('usePassingTest', {
  state: () => ({
    test: {} as Test,
    sessionUuid: '' as string,
  }),
  actions: {
    getTest(id: string, mode: '0' | '1') {
      PassingTest.getTest(id, mode).then(({data}) => this.test = data);
    },

    chooseAnswer(uuidAnswer: string, question: Question) {
      question!.answers!.forEach((el) => {
        if (el.uuidAnswer === uuidAnswer) {
          el.correctAnswer = !el.correctAnswer;
        } else if (!question!.typeAnswerQuestion && el.uuidAnswer !== uuidAnswer) {
          el.correctAnswer = false;
        }
      });
    },
  },
});
