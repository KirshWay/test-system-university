<script setup lang="ts">
import {
  NAlert,
  NButton,
  NSpace,
} from 'naive-ui';
import {
  computed,
  ref,
  watch,
} from 'vue';
import {useRoute} from 'vue-router';

import PassingTestService from '~/api/passingTest.service';
import QuestionCard from '~/components/PassingTest/QuestionCard/QuestionCard.vue';
import {usePassingTest} from '~/store/passing-Test';

const route = useRoute();

const passingTestStore = usePassingTest();

passingTestStore.getTest(route.params.id as string, '0');

const indexActiveQuestion = ref<number>(0);

const activeQuestion = computed(() => passingTestStore.test.questions?.[indexActiveQuestion.value]);

const checkStatusСhoice = computed(() => passingTestStore.test
  .questions?.[indexActiveQuestion.value]?.answers.some((statusEl) => statusEl.correctAnswer));

watch(indexActiveQuestion, () => {
  if (indexActiveQuestion.value + 1 > passingTestStore.test.questions?.length) {
    PassingTestService.finishTestingSession(passingTestStore.sessionUuid);
  }
});
</script>

<template>
  <div>
    <p class="passTest__title">
      {{ passingTestStore.test.title }}
    </p>
    <p
      v-if="indexActiveQuestion < passingTestStore.test.questions?.length"
      class="passTest__counter"
      :class="indexActiveQuestion + 1 === passingTestStore.test.questions?.length && 'passTest__counter_green'"
    >
      {{ `${indexActiveQuestion === 0 ? 1 : indexActiveQuestion + 1} / ${passingTestStore.test.questions?.length}` }}
    </p>
    <QuestionCard
      v-if="activeQuestion"
      :question="activeQuestion"
    />
    <template v-else>
      <n-space vertical>
        <n-alert title="Вы закончили прохождение теста" type="info">
          Пройдите и другие достпные тесты
        </n-alert>
        <router-link to="/">
          <n-button>
            Главная
          </n-button>
        </router-link>
      </n-space>
    </template>
    <n-space style="margin-top: 2%" justify="space-between">
      <n-button v-if="indexActiveQuestion > 0 && activeQuestion" @click="indexActiveQuestion -= 1">
        Предыдущий вопрос
      </n-button>
      <n-button
        v-if="activeQuestion"
        @click="indexActiveQuestion += 1; passingTestStore.sendingAnswers()"
        :disabled="!checkStatusСhoice"
        type="primary"
      >
        {{ indexActiveQuestion + 1 === passingTestStore.test.questions?.length ? `Закончить тест` : `Следующий вопрос` }}
      </n-button>
    </n-space>
  </div>
</template>

<style lang="scss" scoped>
.passTest {
  &__title {
    font-size: 2rem;
  }

  &__counter {
    font-size: 2rem;
    color: #e88080;

    &_green {
      color: #63e2b7
    }
  }
}
</style>
