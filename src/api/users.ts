import $axios from './index';
import {SignIn} from '../types/common';

export const signUpDean = (email: string, username: string, password: string, code: string) => $axios.post(`${import.meta.env.VITE_SERVER}/user/create_dekan/`, {
  email,
  username,
  password,
  code,
});

export const signIn = (login: string, password: string) => $axios.post<SignIn>(`${import.meta.env.VITE_SERVER}/user/obtain_token/`, {login, password});

export const createUser = (email: string, username: string, password: string, status: string) => $axios.post(`${import.meta.env.VITE_SERVER}/user/create_user/`, {email,
  username,
  password,
  status,
});
