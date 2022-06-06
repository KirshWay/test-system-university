import {defineStore} from 'pinia';

import PassingTest from '~/api/passingTest';
import {QuestionType, TestType} from '~/types/common';

export const usePassingTest = defineStore('usePassingTest', {
  state: () => ({
    test: {} as TestType,
    sessionUuid: '' as string,
  }),
  actions: {
    getTest(id: string, mode: '0' | '1') {
      PassingTest.getTest(id, mode).then(({data}) => this.test = data);
    },

    chooseAnswer(uuidAnswer: string, question: QuestionType) {
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
