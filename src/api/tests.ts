import $axios from './index';

const Tests = {
  getAllTest: () => $axios.get(`/test/list_test/`),
  getTest: (uuid_testing: string, mode: '0' | '1') => $axios.get(`/test/get_test/${uuid_testing}/${mode}`),
  createTest: (title: string, answerTime: number, specializationId: number, disciplineId: number) => $axios.post(`/test/create_test/`, {
    title,
    answerTime,
    specializationId,
    disciplineId,
  }),
  updateTest: (title: string, uuidTesting: string) => $axios.put(`/test/update_test/`, {title, uuidTesting}),
  deleteTest: (uuid_testing: string) => $axios.post(`/test/delete_test/`, {uuid_testing}),
  createQuestion: (text: string, uuidTesting: string, competenceId: number, typeAnswerQuestion: boolean) => $axios.post(`/test/create_question/`, {
    text,
    uuidTesting,
    competenceId,
    typeAnswerQuestion,
  }),
  updateQuestion: (text: string, uuidQuestion: string, typeAnswerQuestion?: boolean) => $axios.put(`/test/update_question/`, {
    text, uuidQuestion, typeAnswerQuestion,
  }),
  deleteQuestion: (uuidQuestion: string) => $axios.post(`/test/delete_question/`, {uuidQuestion}),
  createAnswer: (text: string, uuidQuestion: string, correctAnswer: boolean) => $axios.post(`/test/create_answer/`, {
    text, uuidQuestion, correctAnswer,
  }),
  updateAnswerStatus: (uuidAnswer?: string, correctAnswer?: boolean) => $axios.put(`/test/update_answer/`, {uuidAnswer, correctAnswer}),
  updateAnswerText: (text: string, uuidAnswer?: string) => $axios.put(`/test/update_answer/`, {text, uuidAnswer}),
  deleteAnswer: (uuidAnswer: string) => $axios.post(`/test/delete_answer/`, {uuidAnswer}),
};

export default Tests;
