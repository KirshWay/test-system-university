import $axios from './index';
import {SignIn} from '../types/common';

export const signUpDean = (email: string, username: string, password: string, code: string) => $axios.post(`/user/create_dekan/`, {
  email,
  username,
  password,
  code,
});

export const signIn = (login: string, password: string) => $axios.post<SignIn>(`/user/obtain_token/`, {login, password});

export const createUser = (email: string, username: string, password: string, status: string) => $axios.post(`/user/create_user/`, {email,
  username,
  password,
  status,
});

export const getAllStudent = () => $axios.get('/user/get_students_list/');

export const getAllTeacher = () => $axios.get('/user/get_techers_list/');
