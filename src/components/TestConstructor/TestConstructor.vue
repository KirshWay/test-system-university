<script setup lang="ts">
import {ref} from 'vue';
import {
  NP,
  NDivider,
  NCard,
  NSpace,
  NInput,
  NSwitch,
  NRadio,
  NRadioGroup,
  NIcon,
  NButton,
} from 'naive-ui';
import {Question, Plus} from '@vicons/fa';

const OPTIONS = [
  {
    label: 'Преподаватель',
    value: 'Преподаватель',
  },
];

const value = ref(null);
const active = ref(false);
</script>

<template>
  <n-card>
    <n-p>Заголовок теста</n-p>
    <n-divider />
    <n-card>
      <n-space vertical>
        <n-radio-group v-model:value="value" name="radiogroup">
          <n-space vertical>
            <n-radio v-for="option in OPTIONS" :key="option.value" :value="option.value">
              {{ option.label }}
            </n-radio>
          </n-space>
        </n-radio-group>
        <n-button dashed class="constructor__button" style="justify-content: flex-start;">
          <template #icon>
            <n-icon>
              <Plus />
            </n-icon>
          </template>
          Добавить ответ
        </n-button>
        <n-space style="margin-top: 2%" align="center">
          <n-switch v-model:value="active" />
          <n-p>Несколько правильных ответов</n-p>
        </n-space>
      </n-space>
    </n-card>
    <n-button dashed class="constructor__button">
      <template #icon>
        <n-icon>
          <Question />
        </n-icon>
      </template>
      Добавить вопрос
    </n-button>
  </n-card>
</template>

<style lang="scss" scoped>
.constructor {
  &__button {
    width: 100%;
    margin-top: 2%;
  }
}
</style>
