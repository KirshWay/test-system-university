import {defineStore} from 'pinia';
// import {UserType} from '../types/user';

export const useStore = defineStore('main', {
  state: () => {
    return {
      // user: {} as UserType,
      isAuth: false,
    };
  },
});
