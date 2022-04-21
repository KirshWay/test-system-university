<script setup lang="ts">
import {NButton, NSpace} from 'naive-ui';

import {usePassTest} from '~/store/passTest';

const passTestStore = usePassTest();
</script>

<template>
  <div>
    <p class="passTest__title">
      Название теста
    </p>
    <n-space justify="end">
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
