/*
* Стандартная модель пользователя
* */
export type UserModelType = {
    email: string,
    username: string,
    password: string,
};

/*
* Тип для декана
* */
export type CreateDeanType = {
    code: string;
} & UserModelType;

/*
* Авторизация пользователя
* */
export type CreateUser = {
    status: string;
} & UserModelType;

/*
* Авторизация пользователя
* */
export type AuthDeanType = {
    login: string,
    password: string,
}

/*
* Тип для взаимодействия с тестами
* */
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
