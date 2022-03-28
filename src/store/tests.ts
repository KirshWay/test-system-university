import {defineStore} from 'pinia';
import {TestType, QuestionType, AnswersType} from '../types/common';

export const useTestStore = defineStore('tests', {
  state: () => ({
    tests: [] as TestType[],
    questions: [] as QuestionType[],
    answers: [{
      text: 'Преподаватель',
      uuid_answer: `${Date.now()}`,
      correct_answer: false,
    }] as AnswersType[],
  }),
  actions: {
    addAnswer() {
      this.answers.push({
        text: `${Date.now()}`,
        uuid_answer: `${Date.now()}`,
        correct_answer: false,
      });
    },
    updateAnswerText(id: string, label: string) {
      this.answers.filter((el) => {
        if (el.uuid_answer === id) {
          el.text = label;
        }
      });
    },
    deleteAnswer(id: string) {
      this.answers = this.answers.filter((el) => el.uuid_answer !== id);
    },
  },
});
