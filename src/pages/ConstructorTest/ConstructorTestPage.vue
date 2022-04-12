<script setup lang="ts">
import {Question, Table} from '@vicons/fa';
import {
  NButton,
  NCard,
  NDivider,
  NIcon,
  NInput,
  NSpace,
} from 'naive-ui';

import QuestionConstructor from '~/components/ConstructorItems/Question/Question.vue';
import {useTestStore} from '~/store/test';

const testStore = useTestStore();
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
        :key="question.uuid_question"
        style="margin-bottom: 2%"
      >
        <n-space vertical>
          <QuestionConstructor :question="question" />
        </n-space>
      </n-card>
      <n-button
        @click="testStore.addQuestion(testStore.test.uuidTesting)"
        class="constructor__button"
        dashed
      >
        <template #icon>
          <n-icon>
            <Question />
          </n-icon>
        </template>
        Добавить вопрос
      </n-button>
    </n-card>
    <n-space justify="end">
      <n-button>
        <template #icon>
          <n-icon>
            <Table />
          </n-icon>
        </template>
        Загрузить excel таблицу
      </n-button>
      <n-button type="error">
        Удалить
      </n-button>
      <n-button type="success">
        Создать
      </n-button>
    </n-space>
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
