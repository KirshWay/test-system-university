<script setup lang="ts">
import {ref} from 'vue';
import {
  NH1,
  NSpace,
  NCard,
  NInput,
  NSelect,
  NButton,
  NModal,
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

const showModal = ref(false);

const search = ref('');
const selectedValue = ref('');
const nameTest = ref('');
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
    <n-modal
      v-model:show="showModal"
      preset="card"
      title="Создание теста"
      style="max-width: 500px"
    >
      <n-input placeholder="Название теста" v-model:value="nameTest" @keydown.enter="onCreateTest" />
      <template #footer>
        <n-space justify="end">
          <n-button @click="nameTest = ''; showModal = false">Отменить</n-button>
          <n-button type="success" @click="onCreateTest">Создать</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<style lang="scss"></style>
