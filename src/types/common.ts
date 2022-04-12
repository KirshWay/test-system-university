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
    questions?: QuestionType[]
}

export type QuestionType = {
    text: string,
    type_answer_question: boolean,
    uuid_question: string,
    answers?: AnswersType[]
}

export type AnswersType = {
    text: string,
    uuid_answer: string,
    correct_answer: boolean
}
