<script setup lang="ts">
import {Plus, Trash} from '@vicons/fa';
import {
  NButton,
  NCheckbox,
  NIcon,
  NInput,
  NRadio,
  NSpace,
} from 'naive-ui';

import {useTestStore} from '~/store/test';
import {AnswersType} from '~/types/common';

const {
  answer, uuidQuestion, typeAnswerQuestion,
} = defineProps<{
  answer?: AnswersType,
  answers?: AnswersType[],
  uuidQuestion?: string,
  typeAnswerQuestion?: boolean
}>();

const testStore = useTestStore();
</script>

<template>
  <div style="margin-bottom: 2%">
    <n-space
      v-if="typeAnswerQuestion"
      vertical
    >
      <div class="answer__wrapper">
        <n-checkbox :checked="answer.correct_answer" />
        <n-input
          style="max-width: 80%"
          placeholder="Введите вариант ответа"
          v-model:value="answer.text"
          :on-blur="() => testStore.updateAnswer(answer.text, answer.uuidAnswer)"
        />
        <n-button
          @click="testStore.deleteAnswer(answer.uuidAnswer, answers)"
          type="error"
          size="small"
          secondary
        >
          <template #icon>
            <n-icon>
              <Trash />
            </n-icon>
          </template>
        </n-button>
      </div>
    </n-space>
    <n-space
      v-if="!typeAnswerQuestion"
      vertical
    >
      <div class="answer__wrapper">
        <n-radio :checked="answer.correct_answer" />
        <n-input
          style="max-width: 80%"
          placeholder="Введите вариант ответа"
          v-model:value="answer.text"
          :on-blur="() => testStore.updateAnswer(answer.text, answer.uuidAnswer)"
        />
        <n-button
          @click="testStore.deleteAnswer(answer.uuidAnswer, answers)"
          type="error"
          size="small"
          secondary
        >
          <template #icon>
            <n-icon>
              <Trash />
            </n-icon>
          </template>
        </n-button>
      </div>
    </n-space>
  </div>
</template>

<style lang="scss" scoped>
.answer {
  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center
  }
}
</style>
