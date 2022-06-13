<script setup lang="ts">
import {
  NCheckbox,
  NRadio,
  NSpace,
} from 'naive-ui';

import {usePassingTest} from '~/store/passingTest';
import {Answer, Question} from '~/types/test';

const {answer, question} = defineProps<{ answer: Answer, question: Question }>();

const passingTestStore = usePassingTest();
</script>

<template>
  <template v-if="question.typeAnswerQuestion">
    <n-space>
      <n-checkbox
        :checked="answer.correctAnswer"
        @click="passingTestStore.chooseAnswer(answer.uuidAnswer, question, 'checkbox')"
      >
        {{ answer.text }}
      </n-checkbox>
    </n-space>
  </template>
  <template v-else>
    <n-space>
      <n-radio
        :checked="answer.correctAnswer"
        @click="passingTestStore.chooseAnswer(answer.uuidAnswer, question, 'radio')"
      >
        {{ answer.text }}
      </n-radio>
    </n-space>
  </template>
</template>
