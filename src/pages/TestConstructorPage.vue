<script setup lang="ts">
import {
  NH2,
  NButton,
  NIcon,
} from 'naive-ui';
import {Plus} from '@vicons/fa';
import TestConstructor from '../components/TestConstructor/TestConstructor.vue';
</script>

<template>
  <div>
    <n-h2>Конструктор тестов</n-h2>
    <TestConstructor/>
    <n-button dashed class="constructorPage__button">
      <template #icon>
        <n-icon>
          <Plus />
        </n-icon>
      </template>
      Создать тест
    </n-button>
  </div>
</template>

<style lang="scss" scoped>
.constructorPage {
  &__button {
    width: 100%;
    margin-top: 2%;
  }
}
</style>
