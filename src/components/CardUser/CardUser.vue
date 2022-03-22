<script setup lang="ts">
import {ref} from 'vue';
import {
  NCard,
  NTooltip,
  NButton,
  NButtonGroup,
  NIcon,
  NSpace,
  NP,
  NModal,
  NInput,
  NSelect,
} from 'naive-ui';
import {UserEdit, Trash} from '@vicons/fa';

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

const showModal = ref(false);

const email = ref('');
const password = ref('');
const role = ref(null);
</script>

<template>
  <div>
    <n-card title="Имя пользователя">
      <template #header-extra>
        <n-button-group align="center">
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button @click="showModal = true" type="primary">
                <template #icon>
                  <n-icon>
                    <UserEdit />
                  </n-icon>
                </template>
              </n-button>
            </template>
            Редактировать пользователя
          </n-tooltip>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button type="error">
                <template #icon>
                  <n-icon>
                    <Trash />
                  </n-icon>
                </template>
              </n-button>
            </template>
            Удалить пользователя
          </n-tooltip>
        </n-button-group>
      </template>
      <n-space vertical>
        <n-p><strong>Почта пользователя:</strong></n-p>
        <n-p><strong>Роль:</strong></n-p>
      </n-space>
    </n-card>
    <n-modal
      v-model:show="showModal"
      preset="card"
      title="Создание теста"
      style="max-width: 500px"
    >
      Почта
      <n-input placeholder="Введите почту" name="email" v-model:value="email" />
      Пароль
      <n-input placeholder="Введите пароль" type="password" name="password" v-model:value="password" />
      Выберите роль
      <n-select placeholder="Выберите роль" v-model:value="role" :options="OPTIONS" />
      <template #footer>
        <n-space justify="end">
          <n-button @click="showModal = false">Отменить</n-button>
          <n-button type="success" @click="onEditUser">Изменить</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>
