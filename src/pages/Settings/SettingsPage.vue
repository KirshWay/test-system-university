<script setup lang="ts">
import {
  NAvatar,
  NButton,
  NCard,
  NH3,
  NInput,
  useMessage,
} from 'naive-ui';
import {
  ComputedRef,
  inject,
  ref,
} from 'vue';

import UsersService from '~/api/usersService';
import {useMainStore} from '~/store/main';
import {createFormData, generateStatus} from '~/utils/helpers';

const screenWidth = inject<ComputedRef<number>>('screenWidth')!;

const message = useMessage();

const mainStore = useMainStore();

const password = ref<string>('');
const avatar = ref<{
  file?: File,
  data?: string
}>({});

const saveAvatar = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (!(input.files && input.files[0])) {
    return;
  }
  avatar.value = {
    file: input.files[0],
    data: URL.createObjectURL(input.files[0]),
  };
};

const submit = () => {
  const result = createFormData(!avatar.value.file ? {
    'first_name': mainStore.user.firstName,
    'last_name': mainStore.user.lastName,
    'patronymic': mainStore.user.patronymic,
  } : {
    'first_name': mainStore.user.firstName,
    'last_name': mainStore.user.lastName,
    'patronymic': mainStore.user.patronymic,
    'Avatar': avatar.value.file,
  });
  return UsersService.updateUser(result)
    .then(({data}) => {
      mainStore.user = data;
    })
    .catch(() => message.error('Не получилось изменить данные профиля'))
    .finally(() => message.success('Данные изменены'));
};
</script>

<template>
  <n-card title="Настройки профиля">
    <div class="setting__wrapper">
      <div class="setting__avatarContainer">
        <n-avatar
          round
          object-fit="cover"
          :size="160"
          :src="avatar.data || mainStore.avatar"
        />
        <n-button
          style="position: relative;"
          :style="screenWidth < 651 && 'margin: 5% 0'"
          type="info"
        >
          <input
            class="setImageInput"
            accept="image/*"
            type="file"
            @change="saveAvatar"
          >
          Загрузить фото
        </n-button>
      </div>
      <div>
        <n-h3><strong>Статус пользователя: </strong>{{ generateStatus(mainStore.user.status) }}</n-h3>
        <form @submit.prevent="submit">
          Редактирование имени
          <n-input v-model:value="mainStore.user.firstName" placeholder="Имя" />
          Редактирование фамилии
          <n-input v-model:value="mainStore.user.lastName" placeholder="Фамилия" />
          Редактирование отчества
          <n-input v-model:value="mainStore.user.patronymic" placeholder="Отчество" />
          Редактирование почты
          <n-input v-model:value="mainStore.user.email" />
          Редактирование пароля
          <n-input v-model:value="password" type="password" placeholder="Пароль" />
          <n-button
            style="margin-top: 10px"
            type="success"
            attr-type="submit"
            secondary
          >
            Сохранить
          </n-button>
        </form>
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
