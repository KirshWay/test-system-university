import {defineStore} from 'pinia';

import Tests from '~/api/tests';
import {useStore} from '~/store/index';
import {
  AnswersType, QuestionType, TestType,
} from '~/types/common';

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
        answer_time: 240,
        questions: [],
        specialization: 1,
        discipline: 1,
      };

      Tests.createTest(this.test.title, this.test.answer_time, this.test.specialization, this.test.specialization)
        .then(({data}) => {
          this.test.uuidTesting = data.uuid;
          store.router.push(`/constructor-test/${this.test.uuidTesting}`);
        })
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
        typeAnswerQuestion: false,
        answers: [],
      });

      Tests.createQuestion('', uuidTesting, 1, false)
        .then(({data}) => this.test.questions![this.test.questions!.length - 1] = data.question)
        .catch(() => store.message.error('Не получилось создать вопрос'));
    },

    updateQuestion(text: string, uuidQuestion: string, typeAnswerQuestion: boolean) {
      const store = useStore();

      Tests.updateQuestion(text, uuidQuestion, typeAnswerQuestion)
        .catch(() => store.message.error('Не получилось обновить заголовок вопроса'));
    },

    deleteQuestion(uuidQuestion: string) {
      const store = useStore();

      Tests.deleteQuestion(uuidQuestion)
        .then(() => this.test.questions = this.test.questions!.filter((el) => el.uuidQuestion !== uuidQuestion))
        .catch(() => store.message.error('Возникла ошибка при удалении вопроса'));
    },

    addAnswer(uuidQuestion: string) {
      this.test.questions!.filter((el) => el.uuidQuestion === uuidQuestion).map((el) => {
        el.answers!.push({
          text: '',
          correctAnswer: false,
        });
        return Tests.createAnswer('', uuidQuestion, false)
          .then(({data}) => el.answers![el.answers!.length - 1] = data.answer);
      });
    },

    updateAnswerStatus(uuidAnswer: string, question: QuestionType) {
      const store = useStore();
        question!.answers!.forEach((el) => {
          if (el.uuidAnswer === uuidAnswer) {
            el.correctAnswer = !el.correctAnswer;
            Tests.updateAnswerStatus(uuidAnswer, el.correctAnswer)
              .catch(() => store.message.error('Не получилось обновить ответ'));
          } else if (!question!.typeAnswerQuestion && el.uuidAnswer !== uuidAnswer) {
            el.correctAnswer = false;
            Tests.updateAnswerStatus(el.uuidAnswer, el.correctAnswer)
              .catch(() => store.message.error('Не получилось обновить ответ'));
          }
        });
    },

    updateAnswerText(text: string, uuidAnswer: string) {
      const store = useStore();

      Tests.updateAnswerText(text, uuidAnswer)
        .catch(() => store.message.error('Текст ответа не получилось обновить'));
    },

    deleteAnswer(uuidAnswer: string, answers: AnswersType[]) {
      const store = useStore();
      Tests.deleteAnswer(uuidAnswer)
        .then(() => this.test.questions!.forEach((el) =>
          el.answers = answers.filter((el) => el.uuidAnswer !== uuidAnswer)))
        .catch(() => store.message.error('Не получилось удалить ответ'));
    },

    changeTypeAnswer(v: boolean, question: QuestionType) {
      return this.test.questions!.filter((el) => el.uuidQuestion === question.uuidQuestion)
        .map((el) => {
          el.answers!.map((el) => el.correctAnswer = false);
          el.typeAnswerQuestion = v;
          if (question.uuidQuestion != null) {
            this.updateQuestion(question.text, question.uuidQuestion, question.typeAnswerQuestion);
          }
        });
    },
  },
});
