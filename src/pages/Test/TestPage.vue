<script setup lang="ts">
import {NButton, NSpace} from 'naive-ui';

import CardPassTest from '~/components/CardPassTest/CardPassTest.vue';
import {usePassTest} from '~/store/passTest';

const passTestStore = usePassTest();
</script>

<template>
  <div>
    <p class="passTest__title">
      Название теста
    </p>
    <CardPassTest />
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
