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
  computed,
  ComputedRef, inject, ref,
} from 'vue';

import Tests from '~/api/tests';
import CardTest from '~/components/CardTest/CardTest.vue';
import {useTestStore} from '~/store/test';
import {useUser} from '~/store/user';

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

const storeUser = useUser();
const testStore = useTestStore();

const search = ref<string>('');

Tests.getAllTest().then(({data}) => testStore.tests = data);

const filteredListTests = computed( () => testStore.tests.filter((el) => el.title.toLowerCase().includes(search.value.toLowerCase())));
</script>

<template>
  <div>
    <n-space align="center" justify="space-between">
      <n-h1>
        Тесты
      </n-h1>
      <n-button
        v-if="['TEACHER', 'DEAN'].includes(storeUser.user.status)"
        @click="testStore.createTest"
        type="success"
        secondary
      >
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
    </n-space>
    <template v-if="['TEACHER', 'DEAN'].includes(storeUser.user.status)">
      <n-card title="Поиск теста" style="margin-bottom: 24px">
        <n-space vertical>
          <n-input v-model:value="search" placeholder="Поиск теста" />
        </n-space>
      </n-card>
      <CardTest
        v-for="test in filteredListTests"
        :key="test.uuidTesting"
        :test="test"
      />
    </template>
    <template v-if="storeUser.user.status === 'STUDENT'">
      <CardTest
        v-for="test in filteredListTests"
        :key="test.uuidTesting"
        :test="test"
      />
    </template>
  </div>
</template>

<style lang="scss"></style>
