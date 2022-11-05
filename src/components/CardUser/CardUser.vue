<script setup lang="ts">
import {Trash} from '@vicons/fa';
import {
  NButton,
  NButtonGroup,
  NCard,
  NIcon,
  NP,
  NSpace,
  NTooltip,
} from 'naive-ui';
import {computed} from 'vue';

import {useMainStore} from '~/store/main';
import {UsersModel} from '~/types/user';
import {generateStatus} from '~/utils/generate-status';

const mainStore = useMainStore();

const {user} = defineProps<{ user: UsersModel }>();

const titleCard = computed(() => user.lastName && user.firstName ?
  `${user.lastName} ${user.firstName} ${!user.patronymic ? '' : user.patronymic}` :
  `Неизвестно полное ФИО`);
</script>

<template>
  <div>
    <n-card
      :title="titleCard"
    >
      <template #header-extra>
        <n-button-group align="center">
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button @click="mainStore.deleteUser(user.uuid)" type="error">
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
        <n-p><strong>Почта пользователя: </strong>{{ user.email }}</n-p>
        <n-p><strong>Роль: </strong>{{ generateStatus(user.status) }}</n-p>
      </n-space>
    </n-card>
  </div>
</template>
