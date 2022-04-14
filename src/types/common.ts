export type UsersModel = {
    avatar?: string,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    patronymic: string,
    status: string,
    uuid?: string
};

export type SignIn = {
    token: string
}

export type TestType = {
    title: string,
    subtitle?: string,
    answer_time: number,
    uuidTesting?: string,
    specializationId: number,
    disciplineId: number,
    questions?: QuestionType[]
}

export type QuestionType = {
    text: string,
    typeAnswerQuestion: boolean,
    uuidQuestion?: string,
    answers?: AnswersType[]
}

export type AnswersType = {
    text: string,
    uuidAnswer?: string,
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

export type DisciplineCompetencesType = {
    code: string,
    id: number
}
