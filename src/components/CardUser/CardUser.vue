<script setup lang="ts">
import {
  NCard,
  NTooltip,
  NButton,
  NButtonGroup,
  NIcon,
  NSpace,
  NP,
} from 'naive-ui';
import {Trash} from '@vicons/fa';
import {generateStatus} from '~/scripts/common';

const {email, firstName, lastName, patronymic} = defineProps<{
  email: string
  firstName: string
  lastName: string
  patronymic: string
  status: string
}>();
</script>

<template>
  <div>
    <n-card :title="firstName && lastName ?
     `${firstName} ${lastName} ${!patronymic ? '' : patronymic}`
      : `Неизвестно полное ФИО`"
    >
      <template #header-extra>
        <n-button-group align="center">
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
        <n-p><strong>Почта пользователя: </strong>{{ email }}</n-p>
        <n-p><strong>Роль: </strong>{{ generateStatus(status) }}</n-p>
      </n-space>
    </n-card>
  </div>
</template>
