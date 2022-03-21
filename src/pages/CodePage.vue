<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {
  NCard,
  NInput,
  NSpace,
  NButton,
} from 'naive-ui';
import $axios from '~/api';

const router= useRouter();

const code = ref('');

const submit = () => {
  localStorage.setItem('urlAccess', code.value);
  router.push('/sign-up');
};
</script>

<template>
  <div class="authPage">
    <n-card title="Код авторизации">
      <form @submit.prevent="submit">
        <n-space vertical>
          <n-input placeholder="Введите код авторизации" name="code" v-model:value="code" />
          <n-button type="primary" attr-type="submit" class="authPage__button">Отправить</n-button>
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
