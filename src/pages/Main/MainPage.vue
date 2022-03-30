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

const options = ref([
  {
    label: 'Все',
    value: 'all',
  },
  {
    label: 'КП-1',
    value: 'KP-1',
  },
  {
    label: 'КП-2',
    value: 'KP-2',
  },
  {
    label: 'КП-3',
    value: 'KP-3',
  },
]);

const search = ref('');
const selectedValue = ref<string>();
</script>

<template>
  <div>
    <n-h1>
      Тесты
    </n-h1>
    <n-card title="Поиск теста" style="margin-bottom: 24px">
      <n-space vertical>
        <n-input v-model:value="search" placeholder="Поиск теста" />
        <n-select
          placeholder="Выберите тег"
          filterable
          v-model:value="selectedValue"
          :options="options"
        />
      </n-space>
    </n-card>
    <CardTest />
  </div>
</template>

<style lang="scss"></style>
