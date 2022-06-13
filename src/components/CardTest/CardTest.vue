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
  NTooltip,
} from 'naive-ui';

import PassingTest from '~/api/passingTest';
import {usePassingTest} from '~/store/passingTest';
import {useTestStore} from '~/store/test';
import {useUser} from '~/store/user';
import {Test} from '~/types/test';

const {test} = defineProps<{ test: Test }>();

const testStore = useTestStore();
const storeUser = useUser();
const passingTestStore = usePassingTest();
</script>

<template>
  <n-card style="margin-bottom: 2%" hoverable>
    <n-space align="center" justify="space-between">
      <n-p style="margin: 0">
        <strong>Название: </strong> {{ test.title }}
      </n-p>
      <n-button-group v-if="storeUser.user.status === 'STUDENT'">
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
            <n-button type="info">
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
