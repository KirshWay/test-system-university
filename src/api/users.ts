import $axios from './index';
import {CreateDeanType} from '../types/common';

export const signUpDean = (userDean: CreateDeanType) => $axios.post<CreateDeanType>(`${import.meta.env.VITE_SERVER}/user/create_dekan/`, userDean);
