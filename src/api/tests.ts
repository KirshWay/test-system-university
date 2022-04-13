import $axios from './index';

const Tests = {
  getAllTest: () => $axios.get(`/test/list_test/`),
  getTest: (uuid_testing: string) => $axios.get(`/test/get_test/${uuid_testing}`),
  createTest: (title: string, subtitle: string, answer_time: number) => $axios.post(`/test/create_test/`, {
    title, subtitle, answer_time,
  }),
  updateTest: (title: string, uuidTesting: string) => $axios.put(`/test/update_test/`, {title, uuidTesting}),
  deleteTest: (uuid_testing: string) => $axios.post(`/test/delete_test/`, {uuid_testing}),
  createQuestion: (text: string, uuidTesting: string, typeAnswerQuestion: boolean) => $axios.post(`/test/create_question/`, {
    text, uuidTesting, typeAnswerQuestion,
  }),
  updateQuestion: (text: string, uuidQuestion: string) => $axios.put(`/test/update_question/`, {text, uuidQuestion}),
  deleteQuestion: (text: string, testId: string) => $axios.post(`/test/delete_question/`, {text, testId}),
  createAnswer: (text: string, uuidQuestion: string, correctAnswer: boolean) => $axios.post(`/test/create_answer/`, {
    text, uuidQuestion, correctAnswer,
  }),
  updateAnswerText: (text?: string, uuidAnswer?: string, correctAnswer?: string) => $axios.put(`/test/update_answer/`, {
    text, uuidAnswer, correctAnswer,
  }),
  deleteAnswer: (testId: string) => $axios.post(`/test/delete_answer/`, {testId}),
};

export default Tests;
