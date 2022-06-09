import {UsersModel} from '~/types/user';

import $axios from './index';

const Users = {
  signUpDean: (email: string, firstName: string, lastName: string, patronymiс: string, password: string, code: string) => $axios.post(`/user/create_dekan/`, {
    email, firstName, lastName, patronymiс, password, code,
  }),
  signIn: (login: string, password: string) => $axios.post<{token: string}>(`/user/obtain_token/`, {login, password}),
  createUser: (username: string, email: string, firstName: string, lastName: string, patronymic: string, password: string, status: string) => $axios.post(`/user/create_user/`, {
    username,
    email,
    firstName,
    lastName,
    patronymic,
    password,
    status,
  }),
  updateUser: (data: FormData) => $axios.put<UsersModel>(`/user/update_profile/`, data),
  deleteUser: (user_uuid: string) => $axios.post(`/user/delete_user/`, {user_uuid}),
  getProfile: () => $axios.get<UsersModel>(`/user/get_profile/`),
  getAllStudents: () => $axios.get<UsersModel[]>('/user/get_students_list/'),
  getAllTeachers: () => $axios.get<UsersModel[]>('/user/get_techers_list/'),
};

export default Users;
