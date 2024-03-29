import {
  darkTheme,
  lightTheme,
  LoadingBarApi,
  MessageApi,
} from 'naive-ui';
import {defineStore} from 'pinia';
import {RouteLocationNormalizedLoaded, Router} from 'vue-router';

import UsersService from '~/api/usersService';
import {User} from '~/types/user';

/* eslint-disable no-unused-vars */
export enum ThemeEnum {
  Dark = 'dark',
  Light = 'light',
}

const tightThemeOverrides = {Layout: {color: '#f7f8fb'}};

export const useMainStore = defineStore('main', {
  state: () => {
    const theme: ThemeEnum = localStorage.theme || ThemeEnum.Dark;

    return {
      user: {} as User,
      users: [] as User[],
      loader: {} as LoadingBarApi,
      message: {} as MessageApi,
      route: {} as RouteLocationNormalizedLoaded,
      router: {} as Omit<Router, 'currentRoute'>,
      theme,
      themeData: theme === ThemeEnum.Dark ? darkTheme : lightTheme,
    };
  },
  actions: {
    setUser(value: User) {
      this.user = value;
    },

    getAllUsers() {
      const students = UsersService.getAllStudents().then(({data}) => data);
      const developerTests = UsersService.getAllTeachers().then(({data}) => data);
      return Promise.all([students, developerTests])
        .then((users) => this.users = ([] as User[]).concat(...users))
        .catch(this.loader.error)
        .finally(this.loader.finish);
    },

    deleteUser(user_uuid: string) {
      UsersService.deleteUser(user_uuid)
        .then(() => this.users = this.users.filter((el) => el.uuid !== user_uuid))
        .catch(() => this.message.info('Пользователь удалён'));
    },

    toggleTheme() {
      this.theme = this.theme === ThemeEnum.Dark ? ThemeEnum.Light : ThemeEnum.Dark;
      this.themeData = this.theme === ThemeEnum.Dark ? darkTheme : lightTheme;
      localStorage.theme = this.theme;
    },
  },
  getters: {
    avatar(state) {
      return state.user.avatar ? `https://testing-backend.admire.social/${state.user.avatar}` : '/logo.jpg';
    },

    themeOverrides(state) {
      return state.theme === ThemeEnum.Light ? tightThemeOverrides: undefined;
    },
  },
});
