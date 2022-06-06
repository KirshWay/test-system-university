<script setup lang="ts">
import {
  NButton,
  NSpace,
} from 'naive-ui';
import {computed, ref} from 'vue';
import {useRoute} from 'vue-router';

import QuestionCard from '~/components/PassingTest/QuestionCard/QuestionCard.vue';
import {usePassingTest} from '~/store/passingTest';

const route = useRoute();

const passingTestStore = usePassingTest();

passingTestStore.getTest(route.params.id as string, '0');

const indexActiveQuestion = ref(0);

const activeQuestion = computed(() => passingTestStore.test.questions?.[indexActiveQuestion.value]);
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
    <p v-else>
      Вы прошли тест
    </p>
    <n-space style="margin-top: 2%" justify="space-between">
      <n-button v-if="indexActiveQuestion > 0 && activeQuestion" @click="indexActiveQuestion -= 1">
        Предыдущий вопрос
      </n-button>
      <n-button v-if="activeQuestion" @click="indexActiveQuestion += 1" type="primary">
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
