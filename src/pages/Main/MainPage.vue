<script setup lang="ts">
import {ref} from 'vue';
import {
  NH1,
  NSpace,
  NCard,
  NInput,
  NSelect,
} from 'naive-ui';
import Tests from '~/api/tests';
import CardTest from '~/components/CardTest/CardTest.vue';
import {useStore} from '~/store';

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


const store = useStore();

const search = ref('');
const selectedValue = ref<string>();

Tests.getAllTest();
</script>

<template>
  <div>
    <n-h1>
      Тесты
    </n-h1>
    <template v-if="['TEACHER', 'DEAN'].includes(store.user.status)">
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
    </template>
    <template v-if="store.user.status === 'STUDENT'">
      <p>Тесты для студентов</p>
    </template>
  </div>
</template>

<style lang="scss"></style>
