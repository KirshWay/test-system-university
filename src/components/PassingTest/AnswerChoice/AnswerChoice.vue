<script setup lang="ts">
import {
  NCheckbox,
  NRadio,
  NSpace,
} from 'naive-ui';

import {AnswersType} from '~/types/common';

const {answer, typeAnswer} = defineProps<{ answer: AnswersType, typeAnswer: boolean }>();
</script>

<template>
  <template v-if="typeAnswer">
    <n-space>
      <n-checkbox>{{ answer.text }}</n-checkbox>
    </n-space>
  </template>
  <template v-else>
    <n-space>
      <n-radio>{{ answer.text }}</n-radio>
    </n-space>
  </template>
</template>
