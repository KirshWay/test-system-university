import {defineStore} from 'pinia';

import PassingTest from '~/api/passingTest';
import {useUser} from '~/store/user';
import {Question, Test} from '~/types/test';

export const usePassingTest = defineStore('usePassingTest', {
  state: () => ({
    test: {} as Test,
    sessionUuid: '' as string,
    questionUuid: '' as string,
    questionType: false as boolean,
    answerRadio: [] as string[],
    answerCheckBox: [] as string[],
  }),
  actions: {
    getTest(id: string, mode: '0' | '1') {
      PassingTest.getTest(id, mode).then(({data}) => this.test = data);
    },

    startSession(uuidTesting: string) {
      const storeUser = useUser();

      PassingTest.startTestingSession(uuidTesting)
        .then(({data}) => this.sessionUuid = data.sessionUuid)
        .catch(() => storeUser.message.error('Не найден индификатор теста'));
    },

    chooseAnswer(uuidAnswer: string, question: Question, type: 'checkbox' | 'radio') {
      question!.answers!.forEach((el) => {
        this.questionUuid = question.uuidQuestion;
        this.questionType = question.typeAnswerQuestion;

        if (el.uuidAnswer === uuidAnswer) {
          el.correctAnswer = !el.correctAnswer;
          if (type === 'checkbox' && !this.answerCheckBox.includes(uuidAnswer)) this.answerCheckBox.push(uuidAnswer);
          if (!el.correctAnswer) this.answerCheckBox = this.answerCheckBox.filter((chosenAnswer) => chosenAnswer !== el.uuidAnswer);
        } else if (type === 'radio' && !question!.typeAnswerQuestion && el.uuidAnswer !== uuidAnswer) {
          el.correctAnswer = false;
          this.answerRadio[0] = uuidAnswer;
        }
      });
    },

    sendingAnswers() {
      const storeUser = useUser();

      if (!this.questionType) {
        PassingTest.answerQuestion(this.sessionUuid, this.questionUuid, this.answerRadio)
          .catch(() => storeUser.message.error('Произошла ошибка при выборе ответа'));
      } else {
        PassingTest.answerQuestion(this.sessionUuid, this.questionUuid, this.answerCheckBox)
          .catch(() => storeUser.message.error('Произошла ошибка при выборе ответа'));
      }
    },
  },
});
