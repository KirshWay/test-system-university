<script setup lang="ts">
import {
  ArrowRight,
  PenAlt,
  Table,
  Trash,
} from '@vicons/fa';
import {
  NButton,
  NButtonGroup,
  NCard,
  NIcon,
  NP,
  NSpace,
  NTooltip, useLoadingBar, useMessage,
} from 'naive-ui';
import {ref} from 'vue';

import PassingTest from '~/api/passingTest';
import {useMainStore} from '~/store/main';
import {usePassingTest} from '~/store/passingTest';
import {useTestStore} from '~/store/test';
import {Test} from '~/types/test';

const {test} = defineProps<{ test: Test }>();
const statusLoading = ref<boolean>(true);
const loader = useLoadingBar();
const message = useMessage();

const testStore = useTestStore();
const mainStore = useMainStore();
const passingTestStore = usePassingTest();

const downloadResults = (uuidTesting: string) => {
  statusLoading.value = false;
  loader.start();
  PassingTest.downloadExcel(uuidTesting)
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${test.title}.xlsx`);
      document.body.appendChild(link);
      link.click();
      statusLoading.value = false;
    })
    .catch(() => {
      loader.error();
      message.error('Не получилось скачать файл результатов');
    })
    .finally(loader.finish);
};
</script>

<template>
  <n-card style="margin-bottom: 2%" hoverable>
    <n-space align="center" justify="space-between">
      <n-p style="margin: 0">
        <strong>Название теста: </strong> {{ test.title }}
      </n-p>
      <n-button-group v-if="mainStore.user.status === 'STUDENT'">
        <router-link :to="`/test/${test.uuidTesting}`">
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button @click="passingTestStore.startSession(test.uuidTesting)" type="success">
                <template #icon>
                  <n-icon>
                    <ArrowRight />
                  </n-icon>
                </template>
              </n-button>
            </template>
            Пройти тест
          </n-tooltip>
        </router-link>
      </n-button-group>
      <n-button-group v-else align="center">
        <router-link :to="`/test/${test.uuidTesting}`">
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button @click="passingTestStore.startSession(test.uuidTesting)" type="success">
                <template #icon>
                  <n-icon>
                    <ArrowRight />
                  </n-icon>
                </template>
              </n-button>
            </template>
            Пройти тест
          </n-tooltip>
        </router-link>
        <router-link :to="`/constructor-test/${test.uuidTesting}`">
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button type="warning">
                <template #icon>
                  <n-icon>
                    <PenAlt />
                  </n-icon>
                </template>
              </n-button>
            </template>
            Редактирование теста
          </n-tooltip>
        </router-link>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button
              @click="downloadResults(test.uuidTesting)"
              :disabled="!statusLoading"
              type="info"
            >
              <template #icon>
                <n-icon>
                  <Table />
                </n-icon>
              </template>
            </n-button>
          </template>
          Скачать результаты студентов
        </n-tooltip>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button @click="testStore.deleteOnceTest(test.uuidTesting)" type="error">
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
</template>
