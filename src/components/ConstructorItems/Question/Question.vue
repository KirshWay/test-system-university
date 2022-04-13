<script setup lang="ts">
import {Trash} from '@vicons/fa';
import {Plus} from '@vicons/fa';
import {
  NAlert,
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

// const checkAnswerStatus = () => null;
</script>

<template>
  <div>
    <n-input
      placeholder="Заголовок вопроса"
      v-model:value="question.text"
      :on-blur="() => testStore.updateQuestion(question.text, question.uuidQuestion)"
      style="max-width: 100%; margin-bottom: 2%"
    />
    <AnswerConstructor
      v-for="answer in question.answers"
      :key="answer.uuidAnswer"
      :type-answer-question="question.typeAnswerQuestion"
      :answer="answer"
      :answers="question.answers"
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
        v-model:value="question.typeAnswerQuestion"
        :on-update:value="(v) => testStore.changeTypeAnswer(v, question.uuidQuestion)"
      />
      <n-p>Несколько правильных ответов</n-p>
    </n-space>
    <!--    <n-alert-->
    <!--      style="margin-bottom: 2%"-->
    <!--      :title="checkAnswerStatus"-->
    <!--      type="warning"-->
    <!--    />-->
    <n-button
      @click="testStore.deleteQuestion(question.uuidQuestion)"
      dashed
      type="error"
    >
      <template #icon>
        <n-icon>
          <Trash />
        </n-icon>
      </template>
      Удалить вопрос
    </n-button>
  </div>
</template>
