<script setup lang="ts">
import {ref} from 'vue';
import {
  NCard,
  NH2,
  NP,
  NButton,
  NAvatar,
  NSpace,
  NInput,
} from 'naive-ui';
import {useStore} from '../../store';

const store = useStore();

const password = ref('');
</script>

<template>
  <n-card title="Настройки профиля">
    <n-space vertical>
      <n-avatar
        round
        :size="160"
        src="/logo.jpg"
      />
      <n-button type="info">Загрузить фото</n-button>
      <n-h2>{{ store.user.status }}</n-h2>
      Редактирование почты
      <n-input v-model:value="store.user.email" />
      Редактирование пароля
      <n-input v-model:value="password" type="password" placeholder="Пароль" />
      <n-p>{{ store.user.firstName }}</n-p>
      <n-p>{{ store.user.lastName }}</n-p>
      <n-p>{{ store.user.patronymic }}</n-p>
    </n-space>
  </n-card>
</template>
