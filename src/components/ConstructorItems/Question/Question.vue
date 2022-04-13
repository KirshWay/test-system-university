<script setup lang="ts">
import {Plus} from '@vicons/fa';
import {
  NButton,
  NIcon,
  NInput,
  NP,
  NSpace,
  NSwitch,
} from 'naive-ui';

import AnswerConstructor from '~/components/ConstructorItems/Answer/Answer.vue';
import {useTestStore} from '~/store/test';
import {QuestionType} from '~/types/common';

const testStore = useTestStore();

const {question} = defineProps<{ question: QuestionType }>();
</script>

<template>
  <div>
    <n-input
      placeholder="Заголовок вопроса"
      v-model:value="question.text"
      :on-blur="() => testStore.updateQuestion(question.text, question.uuidQuestion)"
      style="margin-bottom: 2%"
    />
    <AnswerConstructor
      v-for="answer in question.answers"
      :key="answer.uuidAnswer"
      :type-answer-question="question.type_answer_question"
      :answer="answer"
      :uuid-question="question.uuidQuestion"
    />
    <n-button
      @click="testStore.addAnswer(question.uuidQuestion)"
      dashed
      class="constructor__button"
      style="justify-content: flex-start;"
    >
      <template #icon>
        <n-icon>
          <Plus />
        </n-icon>
      </template>
      Добавить ответ
    </n-button>
    <n-space style="margin: 1% 0" align="center">
      <n-switch
        v-model:value="question.type_answer_question"
        :on-update:value="(v) => testStore.changeTypeTest(v, question.uuidQuestion)"
      />
      <n-p>Несколько правильных ответов</n-p>
    </n-space>
  </div>
</template>
