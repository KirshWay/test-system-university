<script setup lang="ts">
import {ref} from 'vue';
import {
  NH1,
  NSpace,
  NCard,
  NInput,
  NSelect,
} from 'naive-ui';
import CardTest from '../../components/CardTest/CardTest.vue';

const options = [
  {
    label: 'Drive My Car',
    value: 'song1',
  },
  {
    label: 'Norwegian Wood',
    value: 'song2',
  },
  {
    label: 'You Won\'t See',
    value: 'song3',
  },
];

const search = ref('');
const selectedValue = ref('');
</script>

<template>
  <div>
    <n-h1>
      Тесты
    </n-h1>
    <n-card style="margin-bottom: 24px">
      <n-space vertical>
        <n-input v-model:value="search" placeholder="Поиск теста" />
        <n-select v-model:value="selectedValue" :options="options" placeholder="Выберите тег" />
      </n-space>
    </n-card>
    <CardTest />
  </div>
</template>

<style lang="scss"></style>
