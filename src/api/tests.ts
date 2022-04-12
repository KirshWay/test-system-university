import $axios from './index';

const Tests = {
  getAllTest: () => $axios.get(`/test/list_test/`),
  getTest: (uuid_testing: string) => $axios.get(`/test/get_test/${uuid_testing}`),
  createTest: (title: string, subtitle: string, answer_time: number) => $axios.post(`/test/create_test/`, {
    title, subtitle, answer_time,
  }),
  updateTest: (title: string, uuid_testing: string) => $axios.post(`/test/update_test/`, {title, uuid_testing}),
  deleteTest: (uuid_testing: string) => $axios.post(`/test/delete_test/`, {uuid_testing}),
  createQuestion: (text: string, uuid_testing: string, type_answer_question: string) => $axios.post(`/test/create_question/`, {
    text, uuid_testing, type_answer_question,
  }),
  updateQuestion: (text: string, testId: string) => $axios.post(`/test/update_question/`, {text, testId}),
  deleteQuestion: (text: string, testId: string) => $axios.post(`/test/delete_question/`, {text, testId}),
  createAnswer: (text: string, testId: string, correctAnswer: boolean) => $axios.post(`/test/create_answer/`, {
    text, testId, correctAnswer,
  }),
  updateAnswerText: (text: string, testId: string) => $axios.post(`/test/update_answer/`, {text, testId}),
  deleteAnswer: (testId: string) => $axios.post(`/test/delete_answer/`, {testId}),
};

export default Tests;
