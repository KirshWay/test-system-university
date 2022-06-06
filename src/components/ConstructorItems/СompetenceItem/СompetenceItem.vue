<script setup lang="ts">
import {
  NButton,
  NCard,
  NInputGroup,
  NInputNumber,
  NSelect,
  NSpace,
} from 'naive-ui';
import {ref} from 'vue';

import {useTestStore} from '~/store/test';

const testStore = useTestStore();

const numberСompetence = ref<number>(0);
</script>

<template>
  <n-card title="Выбор по компетенциям" v-if="testStore.showBankMenu">
    <n-input-group style="margin-bottom: 1%;">
      <n-select placeholder="Выберите компетенцию" />
      <n-input-number
        v-model:value="numberСompetence"
        placeholder="Колличество"
        clearable
      />
    </n-input-group>
    <n-space justify="space-between">
      <n-button
        @click="testStore.showBankMenu = !testStore.showBankMenu"
        type="error"
      >
        Отмена
      </n-button>
      <n-button type="success">
        Выбрать
      </n-button>
    </n-space>
  </n-card>
</template>
