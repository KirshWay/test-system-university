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
</script>

<template>
  <div>
    <n-card title="Имя пользователя">
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
        <n-p><strong>ФИО пользователя:</strong></n-p>
        <n-p><strong>Почта пользователя:</strong></n-p>
        <n-p><strong>Роль:</strong></n-p>
      </n-space>
    </n-card>
  </div>
</template>
