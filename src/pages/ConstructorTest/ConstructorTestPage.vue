<script setup lang="ts">
import {Buffer, Question} from '@vicons/fa';
import {
  NButton,
  NCard,
  NDivider,
  NIcon,
  NInput,
  NSpace,
} from 'naive-ui';
import {useRoute} from 'vue-router';

import QuestionConstructor from '~/components/ConstructorItems/QuestionItem/QuestionItem.vue';
import Competence from '~/components/ConstructorItems/СompetenceItem/СompetenceItem.vue';
import {useTestStore} from '~/store/test';

const testStore = useTestStore();
const route = useRoute();

testStore.getTest(route.params.id as string, '1');
</script>

<template>
  <div>
    <n-card style="margin-bottom: 2%">
      <n-input
        placeholder="Заголовок теста"
        v-model:value="testStore.test.title"
        :on-blur="testStore.updateTitleTest"
      />
      <n-divider />
      <n-card
        v-for="question in testStore.test.questions"
        :key="question.uuidQuestion"
        style="margin-bottom: 2%"
      >
        <n-space vertical>
          <QuestionConstructor :question="question" />
        </n-space>
      </n-card>
      <n-button
        @click="testStore.addQuestion(testStore.test.uuidTesting)"
        class="constructor__button"
        style="margin-bottom: 1%"
        dashed
      >
        <template #icon>
          <n-icon>
            <Question />
          </n-icon>
        </template>
        Добавить вопрос
      </n-button>
      <n-button
        v-if="!testStore.showBankMenu"
        @click="testStore.showBankMenu = !testStore.showBankMenu"
        class="constructor__button"
        type="info"
        dashed
      >
        <template #icon>
          <n-icon>
            <Buffer />
          </n-icon>
        </template>
        Добавить вопрос из банка
      </n-button>
      <Competence />
    </n-card>
  </div>
</template>

<style lang="scss">
.constructor {
  &__button {
    width: 100%;
  }

  &__marker {
    display: flex;
    align-items: center;
  }
}
</style>
