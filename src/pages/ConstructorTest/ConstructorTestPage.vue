<script setup lang="ts">
import {Buffer, Question} from '@vicons/fa';
import {
  NButton,
  NCard,
  NDivider,
  NIcon,
  NInput,
  NSelect,
  NSpace,
} from 'naive-ui';
import {computed, ref} from 'vue';
import {useRoute} from 'vue-router';

import TestsService from '~/api/tests.service';
import QuestionConstructor from '~/components/ConstructorItems/QuestionItem/QuestionItem.vue';
import Competence from '~/components/ConstructorItems/СompetenceItem/СompetenceItem.vue';
import {useMainStore} from '~/store/main';
import {useTestStore} from '~/store/test';

const specialization = ref<number | null>(null);

const testStore = useTestStore();
const mainStore = useMainStore();
const route = useRoute();

const specializationChecked = computed(() => testStore.test.specialization && (specialization.value = testStore.test.specialization.id));

const choseSpecialization = (value: number) => {
  mainStore.message.info('При изменении специальности на другую, вопросы будут удалены');
  testStore.test.specialization = value;
  TestsService.updateTest(testStore.test.title, testStore.test.uuidTesting, value);
  testStore.getTest(route.params.id as string, '1');
};

testStore.getTest(route.params.id as string, '1');
</script>

<template>
  <div>
    <n-card style="margin-bottom: 2%">
      <n-input
        v-model:value="testStore.test.title"
        :on-blur="testStore.updateTitleTest"
        placeholder="Заголовок теста"
        style="margin-bottom: 2%"
      />
      <n-select
        v-model:value="specializationChecked"
        :options="testStore.dataSpecializationsForForm"
        :on-update:value="(v) => choseSpecialization(v)"
        placeholder="Выберите специальность"
        filterable
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
        @click="testStore.addQuestion(testStore.test.uuidTesting, specializationChecked)"
        :disabled="specialization === null || testStore.showBankMenu"
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
        :disabled="!specialization"
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
      <Competence v-if="testStore.showBankMenu" />
    </n-card>
  </div>
</template>

<style lang="scss">
.constructor {
  &__button {
    width: 100%;
  }
}
</style>
