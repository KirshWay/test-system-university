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
      :question="question"
    />
    <n-space style="margin-top: 2%" justify="end">
      <n-button type="primary">
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
