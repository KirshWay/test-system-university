<script setup lang="ts">
import {PlusCircle} from '@vicons/fa';
import {
  NButton,
  NCard,
  NH1,
  NIcon,
  NInput,
  NSelect,
  NSpace,
  NTooltip,
} from 'naive-ui';
import {
  ComputedRef, inject, ref,
} from 'vue';

import Tests from '~/api/tests';
import CardTest from '~/components/CardTest/CardTest.vue';
import {useStore} from '~/store';
import {useTestStore} from '~/store/test';

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

const screenWidth = inject<ComputedRef<number>>('screenWidth')!;

const store = useStore();
const testStore = useTestStore();

const search = ref('');
const selectedValue = ref<string>();

Tests.getAllTest().then(({data}) => testStore.tests = data);
</script>

<template>
  <div>
    <n-space align="center" justify="space-between">
      <n-h1>
        Тесты
      </n-h1>
      <router-link
        v-if="['TEACHER', 'DEAN'].includes(store.user.status)"
        @click="testStore.createTest"
        to="/constructor-test"
      >
        <n-button type="success" secondary>
          <template v-if="screenWidth > 640">
            Создать тест
          </template>
          <n-tooltip v-else placement="bottom-start" trigger="hover">
            <template #trigger>
              <n-icon>
                <plus-circle />
              </n-icon>
            </template>
            Создать тест
          </n-tooltip>
        </n-button>
      </router-link>
    </n-space>
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
      <CardTest
        v-for="test in testStore.tests"
        :key="test.uuidTesting"
        :test="test"
      />
    </template>
    <template v-if="store.user.status === 'STUDENT'">
      <p>Тесты для студентов</p>
    </template>
  </div>
</template>

<style lang="scss"></style>
