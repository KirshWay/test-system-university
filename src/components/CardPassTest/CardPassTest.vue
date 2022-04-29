<script lang="ts" setup>
import {
  NCard,
  NCheckbox,
  NRadio,
} from 'naive-ui';
import {ref} from 'vue';

import {usePassTest} from '~/store/passTest';
import {QuestionType} from '~/types/common';

const {question} = defineProps<{ question: QuestionType }>();


const radioAnswer = ref<boolean>(false);
const checkboxAnswer = ref<boolean>(false);
const typeAnswer = ref<boolean>(false);
</script>

<template>
  <n-card :title="question.text">
    <template v-if="!typeAnswer">
      <n-radio
        :checked="radioAnswer"
        value="Answer"
        :name="`Answer`"
      >
        Ответ 1
      </n-radio>
    </template>
    <template v-else>
      <n-checkbox v-model:checked="checkboxAnswer">
        Checkbox
      </n-checkbox>
    </template>
  </n-card>
</template>
