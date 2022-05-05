<script setup lang="ts">
import {NButton, NSpace} from 'naive-ui';
import {useRoute} from 'vue-router';

import CardPassTest from '~/components/CardPassTest/CardPassTest.vue';
import {usePassTest} from '~/store/passTest';

const passTestStore = usePassTest();

const route = useRoute();

passTestStore.getPassTest(route.params.id as string);
</script>

<template>
  <div>
    <p class="passTest__title">
      {{ passTestStore.test.title }}
    </p>
    <CardPassTest
      v-for="question in passTestStore.test.questions"
      :key="question.uuidQuestion"
      :question="passTestStore.getCurrentQuestion"
    />
    <n-space style="margin-top: 2%" justify="space-between">
      <n-button type="primary">
        Предыдущий вопрос
      </n-button>
      <n-button @click="passTestStore.nextQuestion" type="primary">
        Следующий вопрос
      </n-button>
    </n-space>
  </div>
</template>

<style lang="scss" scoped>
.passTest {
  &__title {
    font-size: 2rem;
  }
}
</style>
