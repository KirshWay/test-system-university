<script setup lang="ts">
import {
  NH2,
  NButton,
  NIcon,
} from 'naive-ui';
import {Plus, Table} from '@vicons/fa';
import TestConstructor from '../../components/TestConstructor/TestConstructor.vue';
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
    <n-button dashed class="constructorPage__button">
      <template #icon>
        <n-icon>
          <Table />
        </n-icon>
      </template>
      Загрузить excel таблицу
    </n-button>
  </div>
</template>

<style lang="scss" scoped>
.constructorPage {
  &__button {
    width: 100%;
    margin: 2% 0;
  }
}
</style>
