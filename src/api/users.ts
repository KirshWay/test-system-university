import $axios from './index';
import {CreateUserType, CreateDeanType} from '../types/common';

export const signUp = (user: CreateUserType) => $axios.post<CreateUserType>(`${import.meta.env.VITE_SERVER}/user/create_user/`, user);

export const signUpDean = (userDean: CreateDeanType) => $axios.post<CreateDeanType>(`${import.meta.env.VITE_SERVER}/user/create_dekan/`, userDean);
