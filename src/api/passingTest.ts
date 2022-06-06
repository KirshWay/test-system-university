import $axios from './index';


// true -> red, false -> pass
const PassingTest = {
  getTest: (uuid_testing: string, mode: '0' | '1') => $axios.get(`/test/get_test/${uuid_testing}/${mode}`),
  startTestingSession: (testUuid: string) => $axios.post(`/results/start_testing_session/`, {testUuid} ),
  finishTestingSession: (sessionUuid: string) => $axios.post(`/results/finish_testing_session/`, {sessionUuid} ),
  answerQuestion: (sessionUuid: string, questionUuid: string, answersUuids: [string]) => $axios.post(`/results/user_answer/`, {
    sessionUuid, questionUuid, answersUuids,
  }),
  resultTest: (id: string) => $axios.get(`/results/get_self_answers/${id}/`),
};

export default PassingTest;
