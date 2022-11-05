<script setup lang="ts">
import {
  NButton,
  NCard,
  NInput,
  NSpace,
  useLoadingBar,
  useMessage,
} from 'naive-ui';
import {ref} from 'vue';
import {useRouter} from 'vue-router';

import UsersService from '~/api/users.service';

const loader = useLoadingBar();
const router = useRouter();

if (localStorage.getItem('Authorization')) router.push('/');

const message = useMessage();

const submit = () => {
  UsersService.signIn(email.value, password.value)
    .then(({data}) => {
      localStorage.setItem('Authorization', data.token);
      router.push('/');
    })
    .catch(() => {
      message.error('Введён неправильный логин или пароль');
      loader.error;
    })
    .finally(loader.finish);
};

const email = ref<string>('');
const password = ref<string>('');
</script>

<template>
  <div class="authPage">
    <n-card title="Система тестирования ГМУ Ушакова">
      <form @submit.prevent="submit">
        <n-space vertical>
          Введите почту
          <n-input placeholder="Почта" name="email" v-model:value="email" />
          Введите пароль
          <n-input
            placeholder="Пароль"
            type="password"
            name="password"
            v-model:value="password"
          />
          <n-button type="primary" attr-type="submit" class="authPage__button">
            Войти
          </n-button>
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
