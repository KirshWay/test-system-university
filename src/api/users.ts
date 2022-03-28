import $axios from './index';
import {AuthDeanType, CreateDeanType, CreateUser} from '../types/common';

export const signUpDean = (userDean: CreateDeanType) => $axios.post<CreateDeanType>(`${import.meta.env.VITE_SERVER}/user/create_dekan/`, userDean);

export const signIn = (user: AuthDeanType) => $axios.post<AuthDeanType>(`${import.meta.env.VITE_SERVER}/user/obtain_token/`, user);

export const createUser = (user: CreateUser) => $axios.post<CreateUser>(`${import.meta.env.VITE_SERVER}/user/create_user/`, user);
