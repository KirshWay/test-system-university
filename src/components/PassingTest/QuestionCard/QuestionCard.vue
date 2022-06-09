<script lang="ts" setup>
import {NCard} from 'naive-ui';

import AnswerChoice from '~/components/PassingTest/AnswerChoice/AnswerChoice.vue';
import {Question} from '~/types/test';

const {question} = defineProps<{ question: Question }>();
</script>

<template>
  <n-card :title="question.text">
    <AnswerChoice
      v-for="answer in question.answers"
      :key="answer.uuidAnswer"
      :answer="answer"
      :question="question"
    />
  </n-card>
</template>
