import {LoadingBarApi, MessageApi} from 'naive-ui';
import {defineStore} from 'pinia';

import Users from '~/api/users';
import {UsersModel} from '~/types/common';

export const useStore = defineStore('main', {
  state: () => {
    return {
      user: {} as UsersModel,
      users: [] as UsersModel[],
      loader: {} as LoadingBarApi,
      message: {} as MessageApi,
    };
  },
  actions: {
    setUser(value: UsersModel) {
      this.user = value;
    },

    getAllUsers() {
      const students = Users.getAllStudents().then(({data}) => data);
      const teachers = Users.getAllTeachers().then(({data}) => data);
      return Promise.all([students, teachers])
        .then((users) => this.users = this.users.concat(...users))
        .catch(this.loader.error)
        .finally(this.loader.finish);
    },

    deleteUser(user_uuid: string) {
      Users.deleteUser(user_uuid)
        .then(() => this.users = this.users.filter((el) => el.uuid !== user_uuid))
        .catch(() => this.message.info('Пользователь удалён'));
    },
  },
  getters: {
    avatar(state) {
      return state.user.avatar ? `https://testing-backend.admire.social/${state.user.avatar}` : '/logo.jpg';
    },
  },
});
