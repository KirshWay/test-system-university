<script setup lang="ts">
import {ref} from 'vue';
import {
  NCard,
  NSelect,
  NInput,
  NButton,
} from 'naive-ui';
import CardUser from '../components/CardUser/CardUser.vue';

const OPTIONS = [
  {
    label: 'Преподаватель',
    value: 'teacher',
  },
  {
    label: 'Студент',
    value: 'student',
  },
];

const role = ref(null);
const name = ref('');
const email = ref('');
const password = ref('');
</script>

<template>
  <div>
    <n-card style="margin-bottom: 3%" title="Создание новых пользователей">
      Выберите создаваемого пользователя
      <n-select placeholder="Выберите создаваемого пользователя" v-model:value="role" :options="OPTIONS" />
      Имя
      <n-input placeholder="Введите имя" name="name" v-model:value="name" />
      Почта
      <n-input placeholder="Введите почту" name="email" v-model:value="email" />
      Пароль
      <n-input style="margin-bottom: 2%" placeholder="Введите пароль" type="password" name="password" v-model:value="password" />
      <n-button type="success" secondary>Создать</n-button>
    </n-card>
    <CardUser />
  </div>
</template>
