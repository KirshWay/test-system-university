<script setup lang="ts">
import {
  NSpace,
  NCard,
  NP,
  NIcon,
  NButton,
  NButtonGroup,
  NTooltip,
} from 'naive-ui';
import {Table, Trash} from '@vicons/fa';
</script>

<template>
  <!-- TODO: переход по id теста  -->
  <router-link :to="`/tests/${Date.now()}`" style="display: block">
    <n-card hoverable>
      <n-space align="center" justify="space-between">
        <n-p style="margin: 0">Тестовое название теста</n-p>
        <n-button-group align="center">
          <n-tooltip trigger="hover">
            <template #trigger>
              <router-link style="color: #fff" :to="`/statistic/${Date.now()}`">
                <n-button type="info">
                  <template #icon>
                    <n-icon>
                      <Table />
                    </n-icon>
                  </template>
                </n-button>
              </router-link>
            </template>
            Информация по результатам теста
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
            Удалить тест
          </n-tooltip>
        </n-button-group>
      </n-space>
    </n-card>
  </router-link>
</template>
