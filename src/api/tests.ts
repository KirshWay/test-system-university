import $axios from './index';

const Tests = {
  getAllTest: () => $axios.get(`${process.env.VITE_SERVER}/test/list_test/`),
  // getTest: (title: string) => $axios.get(`${process.env.VITE_SERVER}/test/get_test/`, {title}),
  createTest: (title: string) => $axios.post(`${process.env.VITE_SERVER}/test/create_test/`, {title}),
  updateTest: (title: string, testId: string) => $axios.post(`${process.env.VITE_SERVER}/test/update_test/`, {title, testId}),
  deleteTest: (testId: string) => $axios.post(`${process.env.VITE_SERVER}/test/delete_test/`, {testId}),
  createQuestion: (text: string, testId: string, typeTest: string) => $axios.post(`${process.env.VITE_SERVER}/test/create_question/`, {text, testId, typeTest}),
  updateQuestion: (text: string, testId: string) => $axios.post(`${process.env.VITE_SERVER}/test/update_question/`, {text, testId}),
  deleteQuestion: (text: string, testId: string) => $axios.post(`${process.env.VITE_SERVER}/test/delete_question/`, {text, testId}),
  createAnswer: (text: string, testId: string, correctAnswer: boolean) => $axios.post(`${process.env.VITE_SERVER}/test/create_answer/`, {text, testId, correctAnswer}),
  updateAnswerText: (text: string, testId: string) => $axios.post(`${process.env.VITE_SERVER}/test/update_answer/`, {text, testId}),
  deleteAnswer: (testId: string) => $axios.post(`${process.env.VITE_SERVER}/test/delete_answer/`, {testId}),
};

export default Tests;
