import $axios from './index';

const Tests = {
  getAllTest: () => $axios.get(`/test/list_test/`),
  // getTest: (title: string) => $axios.get(`/test/get_test/`, {title}),
  createTest: (title: string, subtitle: string, answer_time: number) => $axios.post(`/test/create_test/`, {title, subtitle, answer_time}),
  updateTest: (title: string, testId: string) => $axios.post(`/test/update_test/`, {title, testId}),
  deleteTest: (testId: string) => $axios.post(`/test/delete_test/`, {testId}),
  createQuestion: (text: string, testId: string, typeTest: string) => $axios.post(`/test/create_question/`, {text, testId, typeTest}),
  updateQuestion: (text: string, testId: string) => $axios.post(`/test/update_question/`, {text, testId}),
  deleteQuestion: (text: string, testId: string) => $axios.post(`/test/delete_question/`, {text, testId}),
  createAnswer: (text: string, testId: string, correctAnswer: boolean) => $axios.post(`/test/create_answer/`, {text, testId, correctAnswer}),
  updateAnswerText: (text: string, testId: string) => $axios.post(`/test/update_answer/`, {text, testId}),
  deleteAnswer: (testId: string) => $axios.post(`/test/delete_answer/`, {testId}),
};

export default Tests;
