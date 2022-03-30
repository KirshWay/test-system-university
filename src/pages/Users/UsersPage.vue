<script setup lang="ts">
import {ref, watch} from 'vue';
import {
  NCard,
  NSelect,
  NSpace,
  NInput,
  NButton,
  useLoadingBar,
  useMessage,
} from 'naive-ui';
import CardUser from '../../components/CardUser/CardUser.vue';
import Users from '../../api/users';
import {UsersModel} from '../../types/common';

const message = useMessage();
const loader = useLoadingBar();

const options = ref([
  {
    label: 'Все',
    value: 'all',
  },
  {
    label: 'Преподаватель',
    value: 'TEACHER',
  },
  {
    label: 'Студент',
    value: 'STUDENT',
  },
]);

const selectedValue = ref<string>();
const statusSearch = ref<string>();
const search = ref('');
const username = ref('');
const email = ref('');
const password = ref('');

const allUsers = ref<UsersModel[]>([]);

const submit = () => {
  Users.createUser(
    email.value,
    username.value,
    password.value,
    selectedValue.value!,
  )
    .catch(loader.error)
    .finally(() => {
      loader.finish;
      message.success('Пользователь создан');
    });
};

const getAllUsers = async () => {
  loader.start();
  const students = Users.getAllStudents().then(({data}) => data);
  const teachers = Users.getAllTeachers().then(({data}) => data);
  return Promise.all([students, teachers]).then((users) => allUsers.value.concat(...users))
    .catch(loader.error)
    .finally(loader.finish);
};

console.log(getAllUsers());
console.log(allUsers.value);
</script>

<template>
  <form @submit.prevent="submit">
    <n-card style="margin-bottom: 3%" title="Создание новых пользователей">
      <n-space vertical>
        Выберите тип создаваемого пользователя
        <n-select
          placeholder="Тип пользователя"
          filterable
          v-model:value="selectedValue"
          :options="options"
        />
        Имя пользователя
        <n-input placeholder="Имя" name="name" v-model:value="username" />
        Почта пользователя
        <n-input placeholder="Почту" name="email" v-model:value="email" />
        Пароль пользователя
        <n-input style="margin-bottom: 2%" placeholder="Пароль" type="password" name="password" v-model:value="password" />
        <n-button type="success" attr-type="submit" secondary>Создать</n-button>
      </n-space>
    </n-card>
    <n-card title="Поиск пользователя" style="margin-bottom: 3%">
      <n-space vertical>
        <n-input v-model:value="search" placeholder="Пользователь" />
        <n-select
          placeholder="Тип пользователь"
          filterable
          v-model:value="statusSearch"
          :options="options"
        />
      </n-space>
    </n-card>
    <CardUser />
  </form>
</template>
