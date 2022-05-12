<script lang="ts" setup>
import {NCard} from 'naive-ui';

import AnswerChoice from '~/components/PassingTest/AnswerChoice/AnswerChoice.vue';
import {QuestionType} from '~/types/common';

const {question} = defineProps<{ question: QuestionType }>();
</script>

<template>
  <n-card :title="question.text">
    <AnswerChoice
      v-for="answer in question.answers"
      :key="answer.uuidAnswer"
      :answer="answer"
      :type-answer="question.typeAnswerQuestion"
    />
  </n-card>
</template>
