<script setup lang="ts">
import {
  NButton,
  NCard,
  NInput,
  NSpace,
  useLoadingBar,
} from 'naive-ui';
import {ref} from 'vue';
import {useRouter} from 'vue-router';

import Users from '~/api/users';

const loader = useLoadingBar();
const router = useRouter();

if (localStorage.getItem('Authorization')) router.push('/');

const firstName = ref('');
const lastName = ref('');
const patronymiс = ref('');

const email = ref('');
const password = ref('');
const repeatPassword = ref('');
const accessCode = ref('');

const submit = () => {
  loader.start();
  Users.signUpDean(email.value, firstName.value, lastName.value, patronymiс.value, password.value, accessCode.value).
    then(() => {
      router.push('/');
    }).catch(loader.error).finally(loader.finish);
};
</script>

<template>
  <div class="authPage">
    <n-card title="ГМУ Ушакова система тестирования">
      <form @submit.prevent="submit">
        <n-space vertical>
          Имя
          <n-input placeholder="Имя" name="name" v-model:value="firstName" />
          Фамилия
          <n-input placeholder="Имя" name="name" v-model:value="lastName" />
          Отчество
          <n-input placeholder="Имя" name="name" v-model:value="patronymiс" />
          Почта
          <n-input placeholder="Почта" name="email" v-model:value="email" />
          Пароль
          <n-input
            placeholder="Пароль"
            type="password"
            name="password"
            v-model:value="password"
          />
          Повторите пароль
          <n-input
            placeholder="Повторите пароль"
            type="password"
            name="password"
            v-model:value="repeatPassword"
          />
          Введите код доступа
          <n-input
            placeholder="Код доступа"
            type="password"
            name="access_code"
            v-model:value="accessCode"
          />
          <n-button
            type="primary"
            attr-type="submit"
            class="authPage__button"
            :disabled="password !== repeatPassword || password.length < 8"
          >
            Зарегистрироваться
          </n-button>
          <router-link to="/auth">
            <n-button attr-type="submit" class="authPage__button">
              Авторизоваться
            </n-button>
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
