import {defineStore} from 'pinia';

import Tests from '~/api/tests';
import {useStore} from '~/store/index';
import {TestType} from '~/types/common';

export const useTestStore = defineStore('tests', {
  state: () => ({
    tests: [] as TestType[],
    test: {} as TestType,
  }),
  actions: {
    createTest() {
      const store = useStore();

      this.test = {
        title: '',
        subtitle: '',
        answer_time: 240,
        questions: [],
      };

      Tests.createTest(this.test.title, this.test.subtitle!, this.test.answer_time)
        .catch(() => store.message.error('Нет полного доступа для создания'));
    },

    deleteOnceTest(uuid_testing: string) {
      const store = useStore();

      Tests.deleteTest(uuid_testing)
        .then(() => this.tests = this.tests.filter((el) => el.uuidTesting !== uuid_testing))
        .catch(() => store.message.error('Тест не найден'));
    },

    getTest(idTest: string) {
      const store = useStore();

      Tests.getTest(idTest)
        .then(({data}) => this.test = data)
        .catch(() => store.message.error('Тест не найден'));
    },

    updateTitleTest() {
      const store = useStore();

      Tests.updateTest(this.test.title, this.test.uuidTesting!)
        .then(({data}) => {
          this.test.title = data.title;
          this.test.subtitle = data.subtitle;
          this.test.answer_time = data.answer_time;
        }).catch(() => store.message.error('Не найден id теста'));
    },

    addAnswer(idQuestion: string) {
      this.test.questions!.filter((el) => el.uuid_question === idQuestion).map((el) => el.answers!.push({
        text: '',
        uuid_answer: `${Date.now()}`,
        correct_answer: false,
      }));
    },

    deleteAnswer(idAnswer: string, idQuestion: string) {
      this.test.questions!.map((el) => {
        if (el.uuid_question === idQuestion) {
          return el.answers!.filter((el) => el.uuid_answer !== idAnswer);
        }
      });
    },

    addQuestion(uuid_testing: string) {
      this.test.questions!.push({
        text: '',
        type_answer_question: false,
        uuid_question: `${Date.now()}`,
        answers: [],
      });
    },

    changeTypeTest(v: boolean, idQuestion: string) {
      return this.test.questions!.filter((el) => el.uuid_question === idQuestion).map((el) => el.type_answer_question = v);
    },
  },
});
