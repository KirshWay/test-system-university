import $axios from './index';

const Tests = {
  getAllTest: () => $axios.get(`/test/list_test/`),
  getTest: (uuidTesting: string, mode: '0' | '1') => $axios.get(`/test/get_test/${uuidTesting}/${mode}`),
  createTest: (title: string, answerTime: number) => $axios.post(`/test/create_test/`, {title, answerTime}),
  updateTest: (title: string, uuidTesting: string, specializationId?: number) => $axios.put(`/test/update_test/`, {
    title,
    uuidTesting,
    specializationId,
  }),
  deleteTest: (uuid_testing: string) => $axios.post(`/test/delete_test/`, {uuid_testing}),
  createQuestion: (text: string, uuidTesting: string, specializationId: number, typeAnswerQuestion: boolean) => $axios.post(`/test/create_question/`, {
    text,
    uuidTesting,
    specializationId,
    typeAnswerQuestion,
  }),
  updateQuestion: (text: string, uuidQuestion: string, typeAnswerQuestion?: boolean, competenceId?: number) => $axios.put(`/test/update_question/`, {
    text,
    uuidQuestion,
    typeAnswerQuestion,
    competenceId,
  }),
  deleteQuestion: (uuidTesting: string, uuidQuestion: string) => $axios.post(`/test/delete_question/`, {uuidTesting, uuidQuestion}),
  createAnswer: (text: string, uuidQuestion: string, correctAnswer: boolean) => $axios.post(`/test/create_answer/`, {
    text, uuidQuestion, correctAnswer,
  }),
  updateAnswerStatus: (uuidAnswer?: string, correctAnswer?: boolean) => $axios.put(`/test/update_answer/`, {uuidAnswer, correctAnswer}),
  updateAnswerText: (text: string, uuidAnswer?: string) => $axios.put(`/test/update_answer/`, {text, uuidAnswer}),
  deleteAnswer: (uuidAnswer: string) => $axios.post(`/test/delete_answer/`, {uuidAnswer}),
};

export default Tests;
