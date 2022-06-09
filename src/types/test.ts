export type Test = {
  title: string,
  subtitle?: string,
  answer_time: number,
  uuidTesting?: any,
  specialization: number,
  discipline: number,
  questions: Question[]
}

export type Question = {
  text: string,
  typeAnswerQuestion: boolean,
  uuidQuestion?: any,
  answers: Answer[]
}

export type Answer = {
  text: string,
  uuidAnswer?: any,
  correctAnswer: boolean
}
