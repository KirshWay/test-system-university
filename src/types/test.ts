import {Competence, Specialization} from '~/types/feature';

export type Test = {
  title: string,
  subtitle?: string,
  answer_time: number,
  uuidTesting?: any,
  specialization: Specialization | any,
  competences?: Competence[],
  discipline: number,
  questions: Question[]
}

export type Question = {
  text: string,
  typeAnswerQuestion: boolean,
  uuidQuestion?: any,
  competence: any,
  competences: Competence[],
  answers: Answer[]
}

export type Answer = {
  text: string,
  uuidAnswer?: any,
  correctAnswer: boolean
}
