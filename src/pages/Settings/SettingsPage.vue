<script setup lang="ts">
import {
  ComputedRef,
  inject,
  ref,
} from 'vue';
import {
  NCard,
  NH3,
  NP,
  NButton,
  NAvatar,
  NInput,
} from 'naive-ui';
import {useStore} from '~/store';
import {generateStatus} from '~/scripts/common';

const screenWidth = inject<ComputedRef<number>>('screenWidth')!;

const store = useStore();

const password = ref('');
</script>

<template>
  <n-card title="Настройки профиля">
    <div class="setting__wrapper">
      <div class="setting__avatarContainer">
        <n-avatar
          round
          :size="160"
          :src="store.user.avatar || '/logo.jpg'"
        />
        <n-button :style="screenWidth < 651 && 'margin: 5% 0'" type="info">Загрузить фото</n-button>
      </div>
      <div>
        <n-h3><strong>Статус пользователя: </strong>{{ generateStatus(store.user.status) }}</n-h3>
        <template v-if="store.user.status === 'DEAN' || store.user.status === 'TEACHER'">
          Редактирование имени
          <n-input v-model:value="store.user.firstName" placeholder="Имя" />
          Редактирование фамилии
          <n-input v-model:value="store.user.lastName" placeholder="Фамилия" />
          Редактирование отчества
          <n-input v-model:value="store.user.patronymic" placeholder="Отчество" />
          Редактирование почты
          <n-input v-model:value="store.user.email" />
          Редактирование пароля
          <n-input v-model:value="password" type="password" placeholder="Пароль" />
        </template>
        <template v-else>
          <n-p><strong>Имя пользователя: </strong>{{ store.user.firstName }}</n-p>
          <n-p><strong>Имя пользователя: </strong>{{ store.user.lastName }}</n-p>
          <n-p><strong>Имя пользователя: </strong>{{ store.user.patronymic }}</n-p>
        </template>
      </div>
    </div>
  </n-card>
</template>

<style lang="scss" scoped>
.setting {
  &__wrapper {
    display: flex;
    flex-direction: column;

    @media (min-width: 650px) {
      display: flex;
      flex-direction: row;
      gap: 5%;
    }
  }

  &__avatarContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
}
</style>
