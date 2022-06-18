<script setup lang="ts">
import {Trash} from '@vicons/fa';
import {Plus} from '@vicons/fa';
import {
  NButton,
  NIcon,
  NInput,
  NP,
  NSelect,
  NSpace,
  NSwitch,
} from 'naive-ui';
import {computed, ref} from 'vue';

import AnswerConstructor from '~/components/ConstructorItems/AnswerItem/AnswerItem.vue';
import {useTestStore} from '~/store/test';
import {Question} from '~/types/test';

const testStore = useTestStore();

const competence = ref<number | null>(null);

const dataCompetenciesForForm = computed(() => question.competences?.map((el) => ({label: el.code, value: el.id})));

const specializationChecked = computed(() => question.competence && (competence.value = question.competence.id));

const choseCompetence = (value: number) => {
  question.competence = value;
  testStore.updateQuestion(question.text, question.uuidQuestion, question.typeAnswerQuestion, value);
};

const {question} = defineProps<{ question: Question }>();
</script>

<template>
  <div>
    <n-input
      v-model:value="question.text"
      :on-blur="() => testStore.updateQuestion(question.text, question.uuidQuestion, question.typeAnswerQuestion)"
      style="max-width: 100%; margin-bottom: 2%"
      placeholder="Заголовок вопроса"
    />
    <n-select
      v-model:value="specializationChecked"
      :options="dataCompetenciesForForm"
      :on-update:value="(v) => choseCompetence(v)"
      style="margin-bottom: 2%;"
      placeholder="Выбирите компетенцию"
      filterable
    />
    <AnswerConstructor
      v-for="answer in question.answers"
      :key="answer.uuidAnswer"
      :type-answer-question="question.typeAnswerQuestion"
      :answer="answer"
      :answers="question.answers"
      :question="question"
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
        :on-update:value="(v) => testStore.changeTypeAnswer(v, question)"
      />
      <n-p>Несколько правильных ответов</n-p>
    </n-space>
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
