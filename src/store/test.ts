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
        .then(({data}) => this.test.uuidTesting = data.uuid)
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

    addQuestion(uuidTesting: string) {
      const store = useStore();

      this.test.questions!.push({
        text: '',
        type_answer_question: false,
        answers: [],
      });

      Tests.createQuestion('', uuidTesting, false)
        .then(({data}) => this.test.questions![this.test.questions!.length - 1] = data.question)
        .catch(() => store.message.error('Не получилось создать вопрос'));
    },

    updateQuestion(text: string, updateQuestion: string) {
      const store = useStore();

      Tests.updateQuestion(text, updateQuestion)
        .catch(() => store.message.error('Не получилось обновить заголовок вопроса'));
    },

    addAnswer(uuidQuestion: string) {
      this.test.questions!.filter((el) => el.uuidQuestion === uuidQuestion).map((el) => {
        el.answers!.push({
          text: '',
          correct_answer: false,
        });
        return Tests.createAnswer('', uuidQuestion, false)
          .then(({data}) => el.answers![el.answers!.length - 1] = data.answer);
      });
    },

    updateAnswer(text: string, uuidAnswer: string) {
      const store = useStore();

      Tests.updateAnswerText(text, uuidAnswer)
        .catch(() => store.message.error('Не получилось обновить ответ'));
    },

    deleteAnswer(idAnswer: string, idQuestion: string) {
      this.test.questions!.map((el) => {
        if (el.uuidQuestion === idQuestion) {
          return el.answers!.filter((el) => el.uuidAnswer !== idAnswer);
        }
      });
    },

    changeTypeTest(v: boolean, idQuestion: string) {
      return this.test.questions!.filter((el) => el.uuidQuestion === idQuestion).map((el) => el.type_answer_question = v);
    },
  },
});
