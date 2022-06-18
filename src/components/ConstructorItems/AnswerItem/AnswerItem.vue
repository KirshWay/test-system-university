<script setup lang="ts">
import {Check, Trash} from '@vicons/fa';
import {
  NButton,
  NCheckbox,
  NIcon,
  NInput,
  NLi,
  NRadio,
  NSpace,
  NUl,
} from 'naive-ui';

import {useTestStore} from '~/store/test';
import {Answer, Question} from '~/types/test';

const {
  answer,
  typeAnswerQuestion,
  question,
} = defineProps<{
  answer: Answer,
  answers: Answer[],
  question: Question,
  typeAnswerQuestion?: boolean,
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
        <n-checkbox
          :checked="answer.correctAnswer"
          @click="testStore.updateAnswerStatus(answer.uuidAnswer, question)"
        />
        <n-input
          style="max-width: 80%"
          placeholder="Введите вариант ответа"
          v-model:value="answer.text"
          :on-blur="() => testStore.updateAnswerText(answer.text, answer.uuidAnswer)"
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
        <n-radio
          :checked="answer.correctAnswer"
          @click="testStore.updateAnswerStatus(answer.uuidAnswer, question)"
        />
        <n-input
          style="max-width: 80%"
          placeholder="Введите вариант ответа"
          v-model:value="answer.text"
          :on-blur="() => testStore.updateAnswerText(answer.text, answer.uuidAnswer)"
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
