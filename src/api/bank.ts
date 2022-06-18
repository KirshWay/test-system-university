import $axios from './index';

const Bank = {
  addQuestionsBankByCompetence: (competenceId: number, questionsCount: number, uuidTesting: string ) => $axios.post(`/test/add_questions_from_bank_by_competence/`, {
    competenceId,
    questionsCount,
    uuidTesting,
  }),
  addQuestionsBankByDiscipline: (uuidTesting: string, queryByCompetence:
    {
      competenceId: number,
      queryCount: number
    }[]) => $axios.post(`/test/add_questions_from_bank_by_discipline/`, {uuidTesting, queryByCompetence}),
};


export default Bank;
