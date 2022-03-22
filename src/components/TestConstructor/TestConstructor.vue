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
  NCheckbox,
  NCheckboxGroup,
  NIcon,
  NButton,
  NAlert,
} from 'naive-ui';
import {Question, Plus} from '@vicons/fa';

const OPTIONS = [
  {
    label: 'Преподаватель',
    value: 'Преподаватель',
  },
];

const valueChoose = ref(null);
const active = ref(false);
</script>

<template>
  <n-card>
    <n-p>Заголовок теста</n-p>
    <n-divider />
    <n-card>
      <n-space vertical>
        <n-radio-group v-if="!active" v-model:value="valueChoose" name="radiogroup">
          <n-space vertical>
            <n-radio v-for="option in OPTIONS" :key="option.value" :value="option.value">
              {{ option.label }}
            </n-radio>
          </n-space>
        </n-radio-group>
        <n-checkbox-group v-if="active" v-model:value="valueChoose">
          <n-space vertical>
            <n-checkbox v-for="option in OPTIONS" :key="option.label" :value="option.value" :label="option.label" />
          </n-space>
        </n-checkbox-group>
        <n-button dashed class="constructor__button" style="justify-content: flex-start;">
          <template #icon>
            <n-icon>
              <Plus />
            </n-icon>
          </template>
          Добавить ответ
        </n-button>
        <n-space style="margin: 1% 0" align="center">
          <n-switch v-model:value="active" />
          <n-p>Несколько правильных ответов</n-p>
        </n-space>
        <n-alert v-if="valueChoose === null" title=" Вы не выбрали правильный ответ" type="warning" />
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
