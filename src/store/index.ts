import {defineStore} from 'pinia';
import {UsersModel} from '~/types/common';

export const useStore = defineStore('main', {
  state: () => {
    return {
      user: {} as UsersModel,
    };
  },
  actions: {
    setUser(value: UsersModel) {
      this.user = value;
    },
    logout() {
      this.user = {} as UsersModel;
      localStorage.removeItem('Authorization');
    },
  },
  getters: {
    avatar(state) {
      return state.user.avatar ? `https://testing-backend.admire.social/${state.user.avatar}` : '/logo.jpg';
    },
  },
});
