/*
* Стандартная модель пользователя
* */
export type UserModelType = {
    email: string,
    username: string,
    password: string,
};

/*
* Стандартная модель пользователя
* */
export type CreateUserType = {
    status: string
} & Omit<UserModelType, 'email'>;

/*
* Тип для декана
* */
export type CreateDeanType = {
    code: string;
} & UserModelType;

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
