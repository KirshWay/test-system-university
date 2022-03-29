export type UserModelType = {
    email: string,
    username: string,
    password: string,
};

export type SignIn = {
    token: string
}

export type TestType = {
    title: string,
    subtitle: string,
    uuid_testing: string
};

export type QuestionType = {
    text: string,
    type_answer_question: string
    uuid_question: string
    answers: AnswersType[]
}

export type AnswersType = {
    text: string,
    uuid_answer: string,
    correct_answer: boolean
}
