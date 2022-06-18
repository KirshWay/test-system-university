import {defineStore} from 'pinia';

import Features from '~/api/features';
import Tests from '~/api/tests';
import {useUser} from '~/store/user';
import {Specialization} from '~/types/feature';
import {
  Answer,
  Question,
  Test,
} from '~/types/test';

export const useTestStore = defineStore('tests', {
  state: () => ({
    tests: [] as Test[],
    test: {} as Test,
    showBankMenu: false as boolean,
    specializations: [] as Specialization[],
  }),
  actions: {
    createTest() {
      const storeUser = useUser();

      this.test = {
        title: '',
        answer_time: 240,
        questions: [],
        specialization: null,
        discipline: 1,
      };

      Tests.createTest(this.test.title, this.test.answer_time)
        .then(({data}) => {
          this.test.uuidTesting = data.uuid;
          storeUser.router.push(`/constructor-test/${this.test.uuidTesting}`);
        })
        .catch(() => storeUser.message.error('Нет полного доступа для создания'));

      Features.getAllSpecializations()
        .then(({data}) => this.specializations = data);
    },

    deleteOnceTest(uuid_testing: string) {
      const storeUser = useUser();

      Tests.deleteTest(uuid_testing)
        .then(() => this.tests = this.tests.filter((el) => el.uuidTesting !== uuid_testing))
        .catch(() => storeUser.message.error('Тест не найден'));
    },

    getTest(idTest: string, mode: '0' | '1') {
      const storeUser = useUser();

      Tests.getTest(idTest, mode)
        .then(({data}) => this.test = data)
        .catch(() => storeUser.message.error('Тест не найден'));

      Features.getAllSpecializations()
        .then(({data}) => this.specializations = data);
    },

    updateTitleTest() {
      const storeUser = useUser();
      Tests.updateTest(this.test.title, this.test.uuidTesting!)
        .then(({data}) => {
          this.test.title = data.title;
          this.test.subtitle = data.subtitle;
          this.test.answer_time = data.answer_time;
        }).catch(() => storeUser.message.error('Не найден id теста'));
    },

    addQuestion(uuidTesting: string, specializationChecked: number) {
      const storeUser = useUser();

      this.test.questions!.push({
        text: '',
        typeAnswerQuestion: false,
        answers: [],
        competence: {
          code: '',
          id: 0,
        },
        competences: [],
      });

      Tests.createQuestion('', uuidTesting, specializationChecked, false)
        .then(({data}) => {
          this.test.questions![this.test.questions!.length - 1] = data.question;
          this.test.questions![this.test.questions!.length - 1].competences = data.competences;
        })
        .catch(() => storeUser.message.error('Не получилось создать вопрос'));
    },

    updateQuestion(text: string, uuidQuestion: string, typeAnswerQuestion: boolean, competenceId?: number) {
      const storeUser = useUser();

      Tests.updateQuestion(text, uuidQuestion, typeAnswerQuestion, competenceId)
        .catch(() => storeUser.message.error('Не получилось обновить заголовок вопроса'));
    },

    deleteQuestion(uuidQuestion: string) {
      const storeUser = useUser();

      Tests.deleteQuestion(this.test.uuidTesting, uuidQuestion)
        .then(() => this.test.questions = this.test.questions!.filter((el) => el.uuidQuestion !== uuidQuestion))
        .catch(() => storeUser.message.error('Возникла ошибка при удалении вопроса'));
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

    updateAnswerStatus(uuidAnswer: string, question: Question) {
      const storeUser = useUser();
        question!.answers!.forEach((el) => {
          if (el.uuidAnswer === uuidAnswer) {
            el.correctAnswer = !el.correctAnswer;
            Tests.updateAnswerStatus(uuidAnswer, el.correctAnswer)
              .catch(() => storeUser.message.error('Не получилось обновить ответ'));
          } else if (!question!.typeAnswerQuestion && el.uuidAnswer !== uuidAnswer) {
            el.correctAnswer = false;
            Tests.updateAnswerStatus(el.uuidAnswer, el.correctAnswer)
              .catch(() => storeUser.message.error('Не получилось обновить ответ'));
          }
        });
    },

    updateAnswerText(text: string, uuidAnswer: string) {
      const storeUser = useUser();

      Tests.updateAnswerText(text, uuidAnswer)
        .catch(() => storeUser.message.error('Текст ответа не получилось обновить'));
    },

    deleteAnswer(uuidAnswer: string, answers: Answer[]) {
      const storeUser = useUser();
      Tests.deleteAnswer(uuidAnswer)
        .then(() => this.test.questions!.forEach((el) =>
          el.answers = answers.filter((el) => el.uuidAnswer !== uuidAnswer)))
        .catch(() => storeUser.message.error('Не получилось удалить ответ'));
    },

    changeTypeAnswer(v: boolean, question: Question) {
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
  getters: {
    dataSpecializationsForForm(state) {
      return state.specializations.map((el) => ({label: el.title, value: el.id}));
    },
    // dataCompetenciesForForm(state) {
    //   return state.test.questions!.forEach((el) => el.competences.map((el) => ({label: el.code, value: el.id})));
    // },
  },
});
