import $axios from './index';
import {SignIn, UsersModel} from '../types/common';

const Users = {
  signUpDean: (email: string, username: string, password: string, code: string) => $axios.post(`/user/create_dekan/`, {email, username, password, code}),
  signIn: (login: string, password: string) => $axios.post<SignIn>(`/user/obtain_token/`, {login, password}),
  createUser: (email: string, username: string, password: string, status: string) => $axios.post(`/user/create_user/`, {email, username, password, status}),
  updateUser: (username: string, firstName: string, lastName: string, patronymic: string, avatar: string) => $axios.put<UsersModel>(`/user/update_profile/`, {
    username,
    firstName,
    lastName,
    patronymic,
    avatar,
  }),
  getProfile: () => $axios.get<UsersModel>(`/user/get_profile/`),
  getAllStudents: () => $axios.get<UsersModel[]>('/user/get_students_list/'),
  getAllTeachers: () => $axios.get<UsersModel[]>('/user/get_techers_list/'),
};

export default Users;
