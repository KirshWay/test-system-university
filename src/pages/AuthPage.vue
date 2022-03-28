<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {
  NButton,
  NCard,
  NSpace,
  NInput,
} from 'naive-ui';
import {signIn} from '../api/users';

const router= useRouter();

if (localStorage.getItem('Authorization')) router.push('/');

const submit = () => {
  signIn({login: email.value, password: password.value})
    .then((res) => {
      // @ts-ignore
      localStorage.setItem('Authorization', res.data.token);
      router.push('/');
    }).catch(loader.error).finally(loader.finish);
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
          <n-button type="primary" attr-type="submit" class="authPage__button">Войти</n-button>
          <router-link to="/sign-up">
            <n-button attr-type="submit" class="authPage__button">Зарегестрироваться</n-button>
          </router-link>
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
