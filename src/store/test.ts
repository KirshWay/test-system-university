import {defineStore} from 'pinia';

import Features from '~/api/features';
import Tests from '~/api/tests';
import {useMainStore} from '~/store/main';
import {
  Competence, Discipline, Specialization,
} from '~/types/feature';
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
    responseCompetences: [] as Competence[],
    responseDisciplines: [] as Discipline[],
    questionsBankByDiscipline: [] as {
      code: string,
      competence_id: number,
      query_count: number,
    }[],
  }),
  actions: {
    createTest() {
      const mainStore = useMainStore();

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
          mainStore.router.push(`/constructor-test/${this.test.uuidTesting}`);
        })
        .catch(() => mainStore.message.error('Нет полного доступа для создания'));

      Features.getAllSpecializations()
        .then(({data}) => this.specializations = data);
    },

    deleteOnceTest(uuid_testing: string) {
      const mainStore = useMainStore();

      Tests.deleteTest(uuid_testing)
        .then(() => this.tests = this.tests.filter((el) => el.uuidTesting !== uuid_testing))
        .catch(() => mainStore.message.error('Тест не найден'));
    },

    getTest(idTest: string, mode: '0' | '1') {
      const mainStore = useMainStore();

      Tests.getTest(idTest, mode)
        .then(({data}) => this.test = data)
        .catch(() => mainStore.message.error('Тест не найден'));

      Features.getAllSpecializations()
        .then(({data}) => this.specializations = data);
    },

    updateTitleTest() {
      const mainStore = useMainStore();
      Tests.updateTest(this.test.title, this.test.uuidTesting!)
        .then(({data}) => {
          this.test.title = data.title;
          this.test.subtitle = data.subtitle;
          this.test.answer_time = data.answer_time;
        }).catch(() => mainStore.message.error('Не найден id теста'));
    },

    addQuestion(uuidTesting: string, specializationChecked: number) {
      const mainStore = useMainStore();

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
        })
        .catch(() => mainStore.message.error('Не получилось создать вопрос'));
    },

    updateQuestion(text: string, uuidQuestion: string, typeAnswerQuestion: boolean, competenceId?: number) {
      const mainStore = useMainStore();

      Tests.updateQuestion(text, uuidQuestion, typeAnswerQuestion, competenceId)
        .catch(() => mainStore.message.error('Не получилось обновить заголовок вопроса'));
    },

    deleteQuestion(uuidQuestion: string) {
      const mainStore = useMainStore();

      Tests.deleteQuestion(this.test.uuidTesting, uuidQuestion)
        .then(() => this.test.questions = this.test.questions!.filter((el) => el.uuidQuestion !== uuidQuestion))
        .catch(() => mainStore.message.error('Возникла ошибка при удалении вопроса'));
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
      const mainStore = useMainStore();
        question!.answers!.forEach((el) => {
          if (el.uuidAnswer === uuidAnswer) {
            el.correctAnswer = !el.correctAnswer;
            Tests.updateAnswerStatus(uuidAnswer, el.correctAnswer)
              .catch(() => mainStore.message.error('Не получилось обновить ответ'));
          } else if (!question!.typeAnswerQuestion && el.uuidAnswer !== uuidAnswer) {
            el.correctAnswer = false;
            Tests.updateAnswerStatus(el.uuidAnswer, el.correctAnswer)
              .catch(() => mainStore.message.error('Не получилось обновить ответ'));
          }
        });
    },

    updateAnswerText(text: string, uuidAnswer: string) {
      const mainStore = useMainStore();

      Tests.updateAnswerText(text, uuidAnswer)
        .catch(() => mainStore.message.error('Текст ответа не получилось обновить'));
    },

    deleteAnswer(uuidAnswer: string, answers: Answer[]) {
      const mainStore = useMainStore();
      Tests.deleteAnswer(uuidAnswer)
        .then(() => this.test.questions!.forEach((el) =>
          el.answers = answers.filter((el) => el.uuidAnswer !== uuidAnswer)))
        .catch(() => mainStore.message.error('Не получилось удалить ответ'));
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
  },
});
