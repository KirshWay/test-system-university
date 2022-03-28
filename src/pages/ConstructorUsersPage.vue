<script setup lang="ts">
import {ref} from 'vue';
import {
  NCard,
  NSelect,
  NInput,
  NButton,
  useLoadingBar,
} from 'naive-ui';
import CardUser from '../components/CardUser/CardUser.vue';
import {createUser} from '../api/users';

const loader = useLoadingBar();

const OPTIONS = [
  {
    label: 'Преподаватель',
    value: 'TEACHER',
  },
  {
    label: 'Студент',
    value: 'STUDENT',
  },
];

const status = ref('');
const username = ref('');
const email = ref('');
const password = ref('');

const submit = () => {
  createUser({
    email: email.value,
    username: username.value,
    password: password.value,
    status: status.value,
  })
    .catch(loader.error)
    .finally(loader.finish);
};
</script>

<template>
  <form @submit.prevent="submit">
    <n-card style="margin-bottom: 3%" title="Создание новых пользователей">
      Выберите создаваемого пользователя
      <n-select placeholder="Выберите создаваемого пользователя" v-model:value="status" :options="OPTIONS" />
      Имя
      <n-input placeholder="Введите имя" name="name" v-model:value="username" />
      Почта
      <n-input placeholder="Введите почту" name="email" v-model:value="email" />
      Пароль
      <n-input style="margin-bottom: 2%" placeholder="Введите пароль" type="password" name="password" v-model:value="password" />
      <n-button type="success" attr-type="submit" secondary>Создать</n-button>
    </n-card>
    <CardUser />
  </form>
</template>
