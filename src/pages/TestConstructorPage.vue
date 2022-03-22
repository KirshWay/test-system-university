<script setup lang="ts">
import {ComputedRef, inject, ref} from 'vue';
import {
  NH2,
  NButton,
  NButtonGroup,
  NIcon,
  NTooltip,
} from 'naive-ui';
import {Plus} from '@vicons/fa';
import TestConstructor from '../components/TestConstructor/TestConstructor.vue';

const screenWidth = inject<ComputedRef<number>>('screenWidth')!;
</script>

<template>
  <div>
    <n-h2>Конструктор тестов</n-h2>
    <n-button-group style="margin-bottom: 2%">
      <n-button type="success" secondary>
        <template v-if="screenWidth > 640">Создать тест с одним вариантом ответа</template>
        <n-tooltip v-else trigger="hover">
          <template #trigger>
            <n-icon>
              <Plus />
            </n-icon>
          </template>
          Создать тест с одним вариантом ответа
        </n-tooltip>
      </n-button>
      <n-button type="info" secondary>
        <template v-if="screenWidth > 640">Создать тест с несколькими вариантами ответа</template>
        <n-tooltip v-else placement="right-start" trigger="hover">
          <template #trigger>
            <n-icon>
              <Plus />
            </n-icon>
          </template>
          Создать тест с <br/> несколькими <br/> вариантами ответа
        </n-tooltip>
      </n-button>
    </n-button-group>
    <TestConstructor/>
  </div>
</template>
