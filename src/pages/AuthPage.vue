<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {
  NButton,
  NCard,
  NSpace,
  NInput,
  NSelect,
} from 'naive-ui';

const POSTS = [
  {
    label: 'Преподаватель',
    value: 'Educator',
  },
  {
    label: 'Декан',
    value: 'Dean',
  },
  {
    label: 'Ученик',
    value: 'Student',
  },
];

const router= useRouter();

if (localStorage.getItem('authorized')) router.push('/');

const submit = () => {
  localStorage.setItem('authorized', 'fasdasdasd');
  router.push('/');
};

const email = ref('');
const password = ref('');
</script>

<template>
  <div class="authPage">
    <n-card title="Система тестирования ГМУ Ушакова">
      <form @submit.prevent="submit">
        <n-space vertical>
          Почта
          <n-input placeholder="Введите почту" name="email" v-model:value="email" />
          Пароль
          <n-input placeholder="Введите пароль" type="password" name="password" v-model:value="password" />
          <!-- Тип пользователя
          <n-select :default-value="POSTS[2].label" :options="POSTS" size="medium" /> -->
          <n-button type="primary" attr-type="submit" class="authPage__button">Войти</n-button>
          <!-- <router-link to="/sign-up">
            <n-button attr-type="submit" class="authPage__button">Зарегестрироваться</n-button>
          </router-link> -->
        </n-space>
      </form>
    </n-card>
  </div>
</template>

<style lang="scss" scoped>
.authPage {
  height: 100%;
  display: flex;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
  &__button {
    width: 100%;
    margin-top: 16px;
  }
}
</style>
