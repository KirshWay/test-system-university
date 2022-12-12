import $axios from '~/utils/api/get-instance';

const PassingTestService = {
  getTest: (uuidTesting: string, mode: '0' | '1') => $axios.get(`/test/get_test/${uuidTesting}/${mode}`),
  startTestingSession: (testUuid: string) => $axios.post(`/results/start_testing_session/`, {testUuid} ),
  finishTestingSession: (sessionUuid: string) => $axios.post(`/results/finish_testing_session/`, {sessionUuid} ),
  answerQuestion: (sessionUuid: string, questionUuid: string, answersUuids: string[]) => $axios.post(`/results/user_answer/`, {
    sessionUuid, questionUuid, answersUuids,
  }),
  downloadExcel: (uuidTesting: string) => $axios.get(`/results/answers_to_excel/${uuidTesting}`, {
    responseType: 'arraybuffer',
    headers: {'Content-Type': 'application/json'},
  }),
};

export default PassingTestService;
