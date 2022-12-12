type StatusUser = 'TEACHER' | 'STUDENT' | 'DEAN'

export type User = {
    avatar?: string,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    patronymic: string,
    status: StatusUser,
    uuid?: string
};
