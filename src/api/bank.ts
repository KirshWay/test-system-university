import $axios from './index';

const Bank = {
  addQuestionsBankByCompetence: (competenceId: number, questionsCount: number, uuidTesting: string ) => $axios.post(`/test/add_questions_from_bank_by_competence/`),
  addQuestionsBankByDiscipline: (uuidTesting: string, queryByCompetence:
    [{
      competenceId: number,
      queryCount: number
    }]) => $axios.post(`/add_questions_from_bank_by_discipline/`),
};


export default Bank;
