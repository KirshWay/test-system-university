export type UsersModel = {
    avatar?: string,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    patronymic: string,
    status: string,
    uuid?: any
};

export type SignIn = {
    token: string
}

export type TestType = {
    title: string,
    subtitle?: string,
    answer_time: number,
    uuidTesting?: any,
    specialization: number,
    discipline: number,
    questions: QuestionType[]
}

export type QuestionType = {
    text: string,
    typeAnswerQuestion: boolean,
    uuidQuestion?: any,
    answers: AnswersType[]
}

export type AnswersType = {
    text: string,
    uuidAnswer?: any,
    correctAnswer: boolean
}

export type SpecializationType = {
    id: number,
    title: string,
    code: string
}

export type CompetenceType = {
    id: number,
    code: string
}

export type DisciplineType = {
    id: number,
    title: string,
    competences: DisciplineType[]
}
