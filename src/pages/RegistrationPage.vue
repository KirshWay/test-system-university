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

const OPTIONS = [
  {
    label: 'Преподаватель',
    value: 'teacher',
  },
  {
    label: 'Студент',
    value: 'student',
  },
  {
    label: 'Ректор',
    value: 'rector',
  },
];

const router = useRouter();

if (localStorage.getItem('authorized')) router.push('/');

const name = ref('');
const email = ref('');
const password = ref('');
const repeatPassword = ref('');
const role = ref(null);
const accessCode = ref('');

const submit = () => {
  localStorage.setItem('authorized', email.value);
  router.push('/');
};
</script>

<template>
  <div class="authPage">
    <n-card title="ГМУ Ушакова">
      <form @submit.prevent="submit">
        <n-space vertical>
          Имя
          <n-input placeholder="Введите имя" name="name" v-model:value="name" />
          Почта
          <n-input placeholder="Введите почту" name="email" v-model:value="email" />
          Пароль
          <n-input placeholder="Введите пароль" type="password" name="password" v-model:value="password" />
          Повторите пароль
          <n-input placeholder="Повторите пароль" type="password" name="password" v-model:value="repeatPassword" />
          Выберите роль
          <n-select placeholder="Выберите роль" v-model:value="role" :options="OPTIONS" />
          <template v-if="role === 'rector'">
            Введите код доступа
            <n-input placeholder="Введите код доступа" type="password" name="access_code" v-model:value="accessCode" />
          </template>
          <n-button type="primary" attr-type="submit" class="authPage__button" :disabled="password !== repeatPassword || password.length < 8">Зарегистрироваться</n-button>
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
